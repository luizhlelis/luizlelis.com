var dict = {
  "go-lang-self-signed" : `
  # 🔐 Building a self signed server in golang

  This article will be useful to you if you want to create a self signed server in \`golang\`. There are many ways to use certificates to build and run a \`https\` server, this article will approach one of them: \`self-signed\` using openssl tool. You can see all the source code used in the current article in the public [github repository](https://github.com/luizhlelis/go-lang-https-self-signed).
  
  ## Why https?
  
  Firstly let's remember some concepts. The Hypertext Transfer Protocol ([Http](https://tools.ietf.org/html/rfc2616)) specifies a standard track protocol for the internet community and has been in use since 1990. The problem with the use of only http is that the exchanged messages between server and client will not be encrypted, so everyone who intercepts those messages will know exactly what that messages means and also can modify the data to masquerade as one of the peers involved. To avoid attacks like [man-in-the-middle](https://tools.ietf.org/html/rfc4949) and to provide private communication, the Secure Sockets Layer ([SSL](https://tools.ietf.org/html/rfc6101)) was first introduced by Netscape in 1994 being the pioneer in secure communications protocols, but it was succeeded later by the Transport Layer Security ([TLS](https://tools.ietf.org/html/rfc8446)). TLS is the channel-oriented security protocol currently in use on the internet and it's composed basically by two protocols: the handshake and the record protocol.
  
  The TLS Handshake protocol is responsible to authenticate two end-points, besides that, it also negotiates cryptographic parameters and generates keying material. The record protocol uses the parameters established by the handshake protocol to protect traffic between the end-points.
  
  ## Why self signed?
  
  By default your operation system trusts in a set of certification authorities (CA) like GlobalSign, Let's Encrypt, Digicert, GoDaddy, etc. The self-signed certificates are those that aren't signed by any CA, in this case, the certificate is signed with its own private key, instead of requesting it from a CA. So in that case, the client should trust in the certificate issued by the server.
  
  The first thing you need to ask yourself is: why do I need a self signed certificate? There are few reasons for that and I've never faced a reason to use it in a production environment. So maybe you're thinking: so on, what is this article for? There are some scenarios which demands you to provide a \`https\` endpoint (to run your application locally for example). In my case, I needed it to run an application locally to integrate it with a cloud service that requires a \`https\` endpoint. There are some frameworks, SDKs or tool kits written in other languages that provides to you an \`https\` endpoint natively with self-signed certificates (it's the case of [JDK](https://www.oracle.com/java/technologies/downloads/) and [.NET Core](https://dotnet.microsoft.com/en-us/download)), but I didn't find anything like that in \`golang\`.
  
  > **NOTE:** if you're gonna use \`https\` in production, I strongly recommend you to use a certificate signed by a CA (try to use a cloud solution like [AWS Certificate Manager](https://aws.amazon.com/pt/certificate-manager/), or an open source tool like [certbot](https://certbot.eff.org/)). There are some security risks that you should be aware of when using self-signed, you can see more about it [here](https://www.keyfactor.com/blog/self-signed-certificate-risks/).
  
  ## Running the project
  
  > "Talk is cheap, show me the code" - Linus Torvalds
  
  To proceed with the next steps, you're gonna need to clone [this github repo](https://github.com/luizhlelis/go-lang-https-self-signed). The current example is composed by a server and a client called \`https-server\` and \`https-client\` respectively. Each one runs in its specific container, the server provides a REST API written in golang and is responsible to create the self signed certificate. That certificate protects two hostnames: \`localhost\` and \`https-server\`, that multi-domain approach is possible thanks to the [Subject Alternative Names](https://www.digicert.com/faq/subject-alternative-name.htm) (SANs). Take a look at the diagram below that represents the current example:
  
  ![certificate-diagram](https://raw.githubusercontent.com/luizhlelis/go-lang-https-self-signed/main/docs/cert-diagram.png)
  
  As you can see above, the server generates the certificate and the clients trust that certificate (client container or a client running in the host). So, to up the client and server containers, run the command below:
  
  \`\`\` bash
  docker-compose up
  \`\`\`
  
  ## Server
  
  The command above will firstly up the server container and run some commands from a file called [generate-certificate.sh](https://github.com/luizhlelis/go-lang-https-self-signed/blob/main/server/scripts/generate-certificate.sh). That bash file contains some [openssl](https://www.openssl.org/) commands to create the self signed certificate. First, it generates a \`servercert.key\` and \`servercert.csr\` which are respectively: the private key and the certificate signing request (CSR) that contains the public key. The \`CN\` field in \`-subj\` is very important because some browsers like chrome require that information (\`CN\` means Common Name, that's the domain name you would like to have SSL secured). Then, the certificate file will be generated also, this file, named \`servercert.crt\`, is generated by the last command in the bash file. That's the self-signed certificate signed by your own \`servercert.key\` private key. The \`x509\` flag states the standard format of an SSL/TLS certificate, the \`X.509\` format. Finally, the \`https\` server are gonna get up by the \`go run main.go\` command. Take a look at the bash commands bellow:
  
  \`\`\`bash
  apk update && apk add openssl && rm -rf /var/cache/apk/*
  openssl req -new -subj "/C=US/ST=California/CN=localhost" \\
      -newkey rsa:2048 -nodes -keyout "$FILE_CERT_NAME.key" -out "$FILE_CERT_NAME.csr"
  openssl x509 -req -days 365 -in "$FILE_CERT_NAME.csr" -signkey "$FILE_CERT_NAME.key" -out "certificates/$FILE_CERT_NAME.crt" -extfile "self-signed-cert.ext"
  \`\`\`
  
  the \`ext\` file has all tha SANs protected by the certificate:
  
  \`\`\`txt
  subjectAltName = @alt_names
  [alt_names]
  DNS.1 = localhost
  DNS.2 = https-server
  \`\`\`
  
  Now that you already have the certificate, you need to serve your https server. Inside the \`main.go\` file, the \`ListenAndServeTLS\` method is responsible for use the cert and key to serve the \`https\` self signed server:
  
  \`\`\` go
  func handleRequests() {
  
    tlsCert := os.Getenv("tls-certificate")
    tlsKey := os.Getenv("tls-key")
    serverPort := os.Getenv("server-port")
  
    router := mux.NewRouter().StrictSlash(true)
    controllers.HandleHomeRoutes(router, "https")
  
    log.Fatal(http.ListenAndServeTLS(serverPort, tlsCert, tlsKey, router))
  }
  \`\`\`
  
  Along with that, as the cert and key was gotten from the \`.env\` file, you should declare both paths:
  
  \`\`\` env
  tls-certificate="certificates/servercert.crt"
  tls-key="servercert.key"
  \`\`\`
  
  ## Client
  
  The client container has a volume with the path where the server certificate was generated: \`./server/certificates:/certificates\`. That's because the client needs to trust that certificate to make \`https\` calls to the server. The command \`update-ca-certificates\` is responsible to add that certificate to the system's trust store, it was executed in [trust-server-certificate.sh](https://github.com/luizhlelis/go-lang-https-self-signed/blob/main/client/scripts/trust-server-certificate.sh#L11) bash file. After that, the client will be able to call the server with https (the handshake will happen normally). The \`https-client\` container calls the \`/home\` endpoint from the server with https two times after trusting its certificate, take a look at the \`curl\` calls in [get-server-home.sh](https://github.com/luizhlelis/go-lang-https-self-signed/blob/main/client/get-server-home.sh) file:
  
  \`\`\`bash
  #!/bin/ash
  echo "Installing curl package"
  apk update && apk add curl && rm -rf /var/cache/apk/*
  echo "Two requests below to get https server home"
  sleep 10
  curl https://https-server:8081/home
  sleep 20
  curl https://https-server:8081/home
  \`\`\`
  
  ## Call the server with a client running locally (localhost)
  
  As mentioned before, you need to trust the server certificate in your local trust store if you want to use https. If you're using a linux based OS, you should run the commands shown in \`trust-server-certificate.sh\` file. Otherwise, follow one of the steps below:
  
  - [Mac Os](https://tosbourn.com/getting-os-x-to-trust-self-signed-ssl-certificates/)
  
  - [Windows](https://superuser.com/questions/370217/trust-ssl-certificate-to-local-system-account)
  
  - [Linux](https://unix.stackexchange.com/questions/90450/adding-a-self-signed-certificate-to-the-trusted-list)
  
  If you call a server endpoint before trusting the server certificate, you'll get an error like the following in your browser:
  
  ![before-trust](https://raw.githubusercontent.com/luizhlelis/go-lang-https-self-signed/main/docs/before-trust.png)
  
  after trusting the certificate locally, you'll get the response with a 200 Ok status code:
  
  ![after-trust](https://raw.githubusercontent.com/luizhlelis/go-lang-https-self-signed/main/docs/after-trust.png)
  
  if you expand the certificate, you will see all the domains secured by the self-signed certificate:
  
  ![certificate-sans](https://raw.githubusercontent.com/luizhlelis/go-lang-https-self-signed/main/docs/certificate-sans.png)
  
  that behavior is also shown in the server stdout, before trusting the certificate there is a handshake error, but after trusting it, the handshake is successful:
  
  \`\`\`bash
  https-server | 2022/02/07 00:59:53 http: TLS handshake error from 172.19.0.1:55672: remote error: tls: unknown certificate
  https-server | Home page endepoint hit
  \`\`\`
  
  ## References
  
  Digicert; [Multi-Domain (SAN) Certificates - Using Subject Alternative Names](https://www.digicert.com/faq/subject-alternative-name.htm)
  
  Globalsign; [The Dangers of Self-Signed SSL Certificates](https://www.globalsign.com/en/ssl-information-center/dangers-self-signed-certificates)
  
  Keyfactor; [What is a Self-Signed Certificate? Advantages, Risks & Alternatives](https://www.globalsign.com/pt-br/ssl-information-center/what-are-certification-authorities-trust-hierarchies)
  
  OpenSSL; [Cryptography and SSL/TLS Toolkit](https://www.openssl.org/)
  
  RFC 2616; [Hypertext Transfer Protocol -- HTTP/1.1](https://tools.ietf.org/html/rfc2616)
  
  RFC 4949; [Internet Security Glossary, Version 2](https://datatracker.ietf.org/doc/html/rfc4949)
  
  RFC 6101; [The Secure Sockets Layer (SSL) Protocol Version 3.0](https://tools.ietf.org/html/rfc6101)
  
  RFC 8446; [The Transport Layer Security (TLS) Protocol Version 1.3](https://datatracker.ietf.org/doc/html/rfc8446)
  
  `,
  "tracecontext-dotnet": `
  # [c#] Using W3C Trace Context standard in distributed tracing

  In my last [article](/tracecontext), I wrote about the W3C trace context standard and what kind of problem it came to solve. The current article purpose is to show the trace context usage in a microservice architecture. For the first practical example, I chose to develop all applications using c# with \`.NET 5\` ([sample WeatherForecast web API](https://docs.microsoft.com/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio)) and run all of them locally via docker-compose. Hope you enjoy it!
  
  ## Application architecture
  
  The main objective is to propagate a message with \`traceparent\` id throw two APIs and one worker using [W3C trace context](https://www.w3.org/TR/trace-context) standard. The \`first-api\` calls the \`second-api\` by a http call while the \`second-api\` has an asynchronous communication with the \`worker\` by a message broker ([rabbitmq](https://www.rabbitmq.com/) was chosen for that). Furthermore, [zipkin](https://zipkin.io/) was the trace system chosen (or \`vendor\` as the standard call it), being responsible for getting the application traces and building the distributed tracing diagram:
  
  ### <a name="firstfigure"></a>Figure 1 - Distributed trace
  
  ![Distributed Trace](https://raw.githubusercontent.com/luizhlelis/dotnet-trace-context/main/doc/w3c-trace-context.png)
  
  The first and second APIs have the [same code base](https://github.com/luizhlelis/dotnet-trace-context/tree/main/src), but they're being deployed in different containers.
  
  ## OpenTelemetry
  
  An important framework used in the present article to deal with context propagation is [OpenTelemetry](https://opentelemetry.io/). As the documentation saids:
  
  > OpenTelemetry is a set of APIs, SDKs, tooling and integrations that are designed for the creation and management of telemetry data such as traces, metrics, and logs.
  
  [OTel](https://opentelemetry.io/docs/concepts/glossary/) provides a vendor-agnostic instrumentation library to generate, emit, collect, process and export telemetry data. That's not the only purpose of \`OTel\`, which is composed by multiple components: proto, specification, collector, instrumentation libraries. Due to the dense content of \`OpenTelemetry\`, I'll try to approach \`OTel\` in the current article in a shallow way, because that's a subject for another article.
  
  \`W3C TraceContext\` is one of the [propagators](https://github.com/open-telemetry/opentelemetry-specification/blob/b46bcab5fb709381f1fd52096a19541370c7d1b3/specification/context/api-propagators.md#propagators-distribution) maintained and distributed as extension packages by \`OTel\`. That's the reason why \`OTel\` is always related to \`W3C TraceContext\` and vice versa.
  
  ## Talk is cheap, show me the code
  
  > The source code could be found in [this github repo](https://github.com/luizhlelis/dotnet-trace-context).
  
  The default diagnostics library in \`.NET 5\`, called [System.Diagnostics](https://docs.microsoft.com/en-us/dotnet/api/system.diagnostics?view=net-5.0), is already prepared to propagate the context based on W3C TraceContext specification. In previous \`.NET Core\` versions, the context was propagated with a [hierarchical identifier format](https://github.com/dotnet/runtime/blob/main/src/libraries/System.Diagnostics.DiagnosticSource/src/ActivityUserGuide.md#id-format) by default. On \`.NET Core 3.0\`, the identifier format setup started to be available, see [this](https://stackoverflow.com/questions/61251914/how-can-i-access-w3c-tracecontext-headers-in-a-net-core-3-1-application/67086305#67086305) stackoverflow question for more information about how to configure w3c's format in previous \`.NET Core\` versions.
  
  The \`first-api\` and the \`second-api\` showed in [Figure 1](#firstfigure) requires three packages to work properly with \`OpenTelemetry\`:
  
  \`\`\` csharp
      <PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.0.0-rc7" />
      <PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.0.0-rc7" />
      <PackageReference Include="OpenTelemetry.Exporter.Zipkin" Version="1.1.0" />
  \`\`\`
  
  the \`OpenTelemetry.Extensions.Hosting\` package is responsible for register \`OpenTelemetry\` into the application using Dependency Injection, the \`OpenTelemetry.Instrumentation.AspNetCore\` and \`OpenTelemetry.Exporter.Zipkin\` packages represent two source components of \`OpenTelemetry\` framework: the instrumentation library and the collector, respectively. The [instrumentation library](https://opentelemetry.io/docs/concepts/instrumenting/) is responsible for inject the observable information from libraries and applications into the OpenTelemetry API. On the other hand, the [collector](https://opentelemetry.io/docs/concepts/data-collection/) offers a vendor-agnostic implementation on how to receive, process, and export telemetry data. The exporter is the place where to send the received data (\`zipkin\` was the chosen for our example). The \`OTel\`'s dependency injection was done in \`Startup.cs\`:
  
  \`\`\` csharp
      services.AddOpenTelemetryTracing(builder => builder
          .AddAspNetCoreInstrumentation()
          .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(Configuration["Zipkin:ServiceName"]))
          .AddZipkinExporter()
      );
  
      services.Configure<ZipkinExporterOptions>(Configuration.GetSection("Zipkin"));
  \`\`\`
  
  the \`zipkin\` endpoint that receives telemetry data is \`/api/v2/spans\`. As mentioned before, the \`first-api\` and the \`second-api\` have the [same code base](../src/OpenTelemetryApi). For this example, the first is called by a client (\`curl\`) in \`WeatherForecast\` route, which calls the second one in the \`PublishInQueue\` route. Both controller methods have a \`stdout\` print for \`traceparent\` and \`tracestate\`:
  
  \`\`\` csharp
      [ApiController]
      [Route("[controller]")]
      public class WeatherForecastController : ControllerBase
      {
          private readonly ILogger<WeatherForecastController> _logger;
          private readonly IHttpClientFactory _httpClientFactory;
          private readonly IConfiguration _configuration;
          private readonly ConnectionFactory _connectionFactory;
          private readonly TextMapPropagator _propagator = Propagators.DefaultTextMapPropagator;
  
          public WeatherForecastController(
              ILogger<WeatherForecastController> logger,
              IHttpClientFactory httpClientFactory,
              IConfiguration configuration,
              ConnectionFactory connectionFactory)
          {
              _logger = logger;
              _httpClientFactory = httpClientFactory;
              _configuration = configuration;
              _connectionFactory = connectionFactory;
          }
  
          [HttpPost]
          public async Task<IActionResult> SendToTheOtherApi([FromBody] WeatherForecast weatherForecast)
          {
              _logger.LogInformation("Traceparent: {0}", Activity.Current.Id);
              _logger.LogInformation("Tracestate: {0}", Activity.Current.TraceStateString);
              var client = _httpClientFactory.CreateClient();
              var content = new StringContent(JsonConvert.SerializeObject(weatherForecast), Encoding.UTF8, "application/json");
              await client.PostAsync(_configuration["ClientUrl"], content);
  
              return Ok();
          }
  
          [HttpPost]
          [Route("PublishInQueue")]
          public IActionResult PublishInQueue([FromBody] WeatherForecast weatherForecast)
          {
              var message = JsonConvert.SerializeObject(weatherForecast);
              var body = Encoding.UTF8.GetBytes(message);
              var traceparent = Activity.Current.Id;
              var tracestate = Activity.Current.TraceStateString;
              _logger.LogInformation("Traceparent: {0}", traceparent);
              _logger.LogInformation("Tracestate: {0}", tracestate);
  
              using (var connection = _connectionFactory.CreateConnection())
              {
                  using (var channel = connection.CreateModel())
                  {
                      channel.QueueDeclare(
                          queue: _configuration["RabbitMq:QueueName"],
                          durable: false,
                          exclusive: false,
                          autoDelete: false,
                          arguments: null);
  
                      var basicProps = channel.CreateBasicProperties();
  
                      // Inject the ActivityContext into the message headers to propagate trace context to the receiving service.
                      var contextToInject = Activity.Current.Context;
                      _propagator.Inject(
                          new PropagationContext(contextToInject, Baggage.Current),
                          basicProps,
                          RabbitMqHelper.InjectTraceContextIntoBasicProperties);
  
                      RabbitMqHelper.AddMessagingTags(Activity.Current, _configuration);
  
                      channel.BasicPublish(
                          exchange: "",
                          routingKey: _configuration["RabbitMq:QueueName"],
                          basicProperties: basicProps,
                          body: body);
                  }
              }
  
              return Ok();
          }
      }
  \`\`\`
  
  Note that I chose to use a \`propagator\` to inject the context into a carrier. The \`propagator\`s are defined in the [Opentelemetry Specification](https://github.com/open-telemetry/opentelemetry-specification) as "objects used to read and write context data to and from messages exchanged by the applications". The spec also recommends that \`propagators\` must define \`Inject\` and \`Extract\` operations, as the main purpose of \`PublishInQueue\` is to publish a message, the \`Inject\` context operation suits better there, and the \`Extract\` operation in the \`worker\`.
  
  Besides that, the propagation fields (\`traceparent\` and \`tracestate\`) were added in the message header. In the [last article](https://dev.to/luizhlelis/using-w3c-trace-context-standard-in-distributed-tracing-3743), I said that the [standard](https://w3c.github.io/trace-context-amqp/) (in the Working Draft (WD) step of the w3c process) recommends to add the propagation fields in the \`application-properties\` section by the message publisher. For the current example, I chose to propagate that context in the message header even for AMQP calls as was done in [the dotnet OpenTelemetry example](https://github.com/open-telemetry/opentelemetry-dotnet/blob/e3df42bfc15dc1d4dff01d655f669f7c27e35312/examples/MicroserviceExample/Utils/Messaging/MessageSender.cs#L78). It's important to reinforce that \`Trace Context: AMQP protocol\` is not a W3C Recommendation yet. Take a look at the place where the propagation fields were added:
  
  \`\`\`csharp
      public static void InjectTraceContextIntoBasicProperties(
          IBasicProperties props, string key, string value)
      {
          if (props.Headers == null)
          {
              props.Headers = new Dictionary<string, object>();
          }
  
          props.Headers[key] = value;
      }
  \`\`\`
  
  By default, the \`ASP.NET core\` starts an \`Activity\` span when the [request is beginning](https://github.com/dotnet/aspnetcore/blob/867cec475d18892b828ac44a82d74eccfbbb0e49/src/Hosting/Hosting/src/Internal/HostingApplicationDiagnostics.cs#L65) and stop it [at the end](https://github.com/dotnet/aspnetcore/blob/867cec475d18892b828ac44a82d74eccfbbb0e49/src/Hosting/Hosting/src/Internal/HostingApplicationDiagnostics.cs#L162). For that reason this kind of setup is not required for the \`first-api\` and the \`second-api\`. On the other hand, the manually creation of an activity span is required for the \`worker\` because in that case, it's not dealing with http calls, neither an API, but a message listener.
  
  > **_NOTE:_** \`ASP.NET core\` also sets the \`traceparent\` from the upstream request as [the current activity ParentId](https://github.com/dotnet/aspnetcore/blob/main/src/Hosting/Hosting/src/Internal/HostingApplicationDiagnostics.cs#L289).
  
  For the \`worker\` those packages are required:
  
  \`\`\` csharp
      <PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.0.0-rc7" />
      <PackageReference Include="OpenTelemetry.Exporter.Zipkin" Version="1.1.0" />
  \`\`\`
  
  and the \`OTel\`'s dependency injection was configured to the \`worker\` in \`Program.cs\` like the following bellow:
  
  \`\`\` csharp
  services.AddOpenTelemetryTracing(config => config
      .SetResourceBuilder(ResourceBuilder
          .CreateDefault()
          .AddService(configuration["Zipkin:ServiceName"]))
      .AddSource(configuration["Zipkin:ServiceName"])
      .AddZipkinExporter()
  );
  
  services.Configure<ZipkinExporterOptions>(configuration.GetSection("Zipkin"));
  services.AddSingleton(new ActivitySource(configuration["Zipkin:ServiceName"]));
  \`\`\`
  
  It's important to mention that \`ActivitySource\` denotes a [Tracer](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#tracer), which is used to start spans. As mentioned before, for the \`worker\` was required to configure manually a new span scope for each message read:
  
  \`\`\`csharp
      public void MessageHandler(BasicDeliverEventArgs eventArgs)
      {
          // Extract the PropagationContext from the upstream service using message headers.
          var parentContext = _propagator.Extract(
              default,
              eventArgs.BasicProperties,
              RabbitMqHelper.ExtractTraceContextFromBasicProperties);
          Baggage.Current = parentContext.Baggage;
  
          using (var activity = _activitySource.StartActivity(
              _configuration["Zipkin:AppName"],
              ActivityKind.Consumer,
              parentContext.ActivityContext))
          {
              var body = eventArgs.Body.ToArray();
              var message = Encoding.UTF8.GetString(body);
              _logger.LogInformation("Received {0}", message);
              _logger.LogInformation("Traceparent: {0}", Activity.Current.Id);
              _logger.LogInformation("Tracestate: {0}", Activity.Current.TraceStateString);
  
              activity.SetTag("message", message);
              RabbitMqHelper.AddMessagingTags(activity, _configuration);
          }
      }
  \`\`\`
  
  \`MessageHandler\` method is triggered when a new message arrives in the queue, so that's the queue listener. Note that a new span scope is created with \`StartActivity\` method and the most important thing is: how to configure the new span scope specifying which is the upstream span. The \`_propagator\` variable is of the type \`TraceContextPropagator\`, an [opentelemetry-dotnet](https://github.com/open-telemetry/opentelemetry-dotnet/blob/main/src/OpenTelemetry.Api/Context/Propagation/TraceContextPropagator.cs) class that is a text map propagator for W3C trace context. The most important parameter of \`_propagator.Extract\` method is the last one (called \`getter\`), that's the function which \`OTel\` will try to use to extract the propagation fields (\`traceparent\` and \`tracestate\`). Take a look at the way that \`ExtractTraceContextFromBasicProperties\` function was configured to the current example:
  
  \`\`\`csharp
      public static IEnumerable<string> ExtractTraceContextFromBasicProperties(IBasicProperties props, string key)
      {
          if (props.Headers.TryGetValue(key, out var value))
          {
              var bytes = value as byte[];
              return new[] { Encoding.UTF8.GetString(bytes) };
          }
  
          return Enumerable.Empty<string>();
      }
  \`\`\`
  
  as you can see above, the \`worker\` is expecting the \`traceparent\` and \`tracestate\` in the message header.
  
  ## Running the project
  
  Inside [src folder](https://github.com/luizhlelis/dotnet-trace-context/tree/main/src), type the command below to up all containers (\`first-api\`, \`second-api\`, \`worker\`, \`rabbit\` and \`zipkin\`):
  
  \`\`\`bash
    docker-compose up
  \`\`\`
  
  wait for all containers get on and then send a request to the \`first-api\`:
  
  \`\`\`bash
  curl --request POST \\
    --url http://localhost:5000/WeatherForecast \\
    --header 'Content-Type: application/json' \\
    --header 'accept: */*' \\
    --data '{
    "temperatureC": 10,
    "summary": "Trace Test"
  }'
  \`\`\`
  
  the message that you sent above will travel throughout the flow (\`first-api\` > \`second-api\` >  \`rabbit\` > \`worker\`) along with the propagation fields (\`traceparent\` and \`tracestate\`). Take a look at the application \`stdout\`:
  
  \`\`\`log
  first-api     | info: OpenTelemetryApi.Controllers.WeatherForecastController[0]
  first-api     |       Traceparent: 00-0a0578c18192c14bae738b777e072a42-2db0e8c6b4654744-01
  first-api     | info: OpenTelemetryApi.Controllers.WeatherForecastController[0]
  first-api     |       Tracestate: (null)
  second-api    | info: OpenTelemetryApi.Controllers.WeatherForecastController[0]
  second-api    |       Traceparent: 00-0a0578c18192c14bae738b777e072a42-bfc08418aeb71a4e-01
  second-api    | info: OpenTelemetryApi.Controllers.WeatherForecastController[0]
  second-api    |       Tracestate: (null)
  worker        | info: Worker.WorkerService[0]
  worker        |       Traceparent: 00-0a0578c18192c14bae738b777e072a42-004468438f2d724c-01
  worker        | info: Worker.WorkerService[0]
  worker        |       Tracestate: (null)
  \`\`\`
  
  note that the \`trace-id\` (\`0a0578c18192c14bae738b777e072a42\`) remains the same throughout all the trace, and the \`span-id\` (or \`parent-id\`) has been updated between the applications (\`2db0e8c6b4654744\`, \`bfc08418aeb71a4e\` and \`004468438f2d724c\`). To see the generated distributed tracing diagram, access \`zipkin\` in your browser:
  
  \`\`\`bash
    http://localhost:9411/
  \`\`\`
  
  at home page, let the search field empty and type \`RUN QUERY\` to load all traces. Finally, click in your trace, then you'll see a diagram like this:
  
  ![Zipkin Diagram](https://raw.githubusercontent.com/luizhlelis/dotnet-trace-context/main/doc/zipkin-diagram.png)
  
  ## Conclusion
  
  The W3C Trace Context standard came to define a standard to the distributed tracing propagation. Currently, there is only one \`W3C Recommendation\` which is for HTTP calls (launched in february 2020), all the other standards are in the \`working in process\` step (AMQP, MQTT and baggage). It doesn't mean that you should avoid to use the standard in a production environment, but keep in mind that some things are going to change and is important to be up to date with newer releases.
  
  If you got until here and liked the article content, let me know reacting to the current post. You can also open a discussion below, I'll try to answer soon. On the other hand, if you think that I said something wrong, please open an issue in the [article's github repo](https://github.com/luizhlelis/dotnet-trace-context). In the next article, I'll show a full distributed trace example in a microsservice architecture, just like this, but using \`python\` with \`django\`. Hope you like it!
  
  ## References
  
  DRUTU, Bogdan; KANZHELEV, Sergey; MCLEAN, Morgan; MOLNAR, Nik; REITBAUER, Alois; SHKURO, Yuri. [W3C Recommendation - Trace Context](https://www.w3.org/TR/trace-context/)
  
  KANZHELEV, Sergey; VASTERS, Clemens. [W3C Editor's draft - Trace Context: AMQP protocol](https://w3c.github.io/trace-context-amqp/)
  
  OPENTELEMETRY, Community. [OpenTelemetry .NET](https://github.com/open-telemetry/opentelemetry-dotnet)
  
  OPENTELEMETRY, Community. [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
  
  OPENTELEMETRY, Community. [OpenTelemetry Specification](https://github.com/open-telemetry/opentelemetry-specification)
  
  `,
  "tracecontext": `
  # Using W3C Trace Context standard in distributed tracing

  In the software development process, when a system experiences a failure in runtime, it's natural for a developer to try to link that failure with who called that method and also which was the original request. This is where [stack trace](https://en.wikipedia.org/wiki/Stack_trace) comes in, look at an example below:
  
  \`\`\` bash
  Unhandled exception. System.InvalidOperationException: Stack trace example
     at Program.CallChildActivity() in /Users/luizhlelis/Documents/projects/personal/trace-context-w3c/src/system-diagnostics-activity/Program.cs:line 22
     at Program.Main() in /Users/luizhlelis/Documents/projects/personal/trace-context-w3c/src/system-diagnostics-activity/Program.cs:line 11
  \`\`\`
  
  with the information above we're able to know that a failure happened at \`CallChildActivity()\` method (line 22) which was called by the \`Main()\` method (line 11) both inside the \`Program.cs\` class. That's the reason why the runtime message tracking is essential for a software health and reliability, a rich information like that greatly increases the troubleshoot productivity. So the \`stack trace\` suits very well in terms of message trace when the subject is a single process application, like monolithic systems. On the other hand, when dealing with distributed systems like in a microservice architecture, the stack trace is not enough to expose the entire message tracking. That's the reason why distributed tracing tools and standards became necessary. The W3C defines a standard for this type of tracking, which is called \`Trace Context\`.
  
  ## W3C Trace Context purpose
  
  Imagine a system designed as a microservice architecture where two APIs communicate in a synchronous way (http calls) and the second API communicates with a worker by a message broker:
  
  ### Figure 1 - Distributed trace
  
  ![distributed-trace](https://raw.githubusercontent.com/luizhlelis/trace-context-w3c/main/doc/distributed-trace.png)
  
  just like the \`stack trace\`, every \`Activity\` needs an Id to be identifiable and also needs to know the \`Activity\` Id of who called it. With the purpose of solving this kind of problem, some vendors came up delivering not only the distributed trace message information but also the application performance, the load time, the application's response time, and other stuff. That kind of vendor is called Application Performance Management tools (APM tools) or also trace systems, below are some examples:
  
  - Dynatrace
  - New Relic
  - Application Insights
  - Elastic APM
  - Zipkin
  
  > **_NOTE:_**  I chose to use the term \`vendor\` to describe all the trace systems because that's the way as the standard refers to them. But it seems that [it'll be changed soon](https://github.com/w3c/trace-context/issues/387).
  
  now imagine a scenario where there are many vendors and also many languages with different diagnostics libraries, some of them identify a trace with an \`operation-id\`, other calls it as \`request-id\` and also there is another one which recognizes it as a \`trace-id\`. Besides that, the id's format changes depending on vendor or diagnostic library: one is in the \`hierarchical\` format, another one is an \`UUID\` and there is also a 24 character \`string\` identifier. That scenario would result in: systems with different tracing vendors will not be able to correlate the traces and also will not be able to propagate traces as there is no unique identification that is forwarded. This is where trace context standard comes in.
  
  ## The trace context standard
  
  The [W3C Trace Context](https://www.w3.org/TR/trace-context/) specification defines a standard to HTTP headers and formats to propagate the distributed tracing context information. It defines two fields that should be propagated in the http request's header throughout the trace flow. Take a look below at the standard definition of each field:
  
  - \`traceparent\`: identifier responsible to describe the incoming request position in its trace graph. It represents a common format of the incoming request in a tracing system, understood by all vendors.
  
  - \`tracestate\`: extends traceparent with vendor-specific data represented by a set of name/value pairs. Storing information in tracestate is optional.
  
  ## The \`traceparent\` field
  
  The \`traceparent\` field uses the Augmented Backus-Naur Form (ABNF) notation of [RFC5234](https://www.w3.org/TR/trace-context/#bib-rfc5234) and is composed by 4 sub-fields:
  
  \`version\` - \`traceid\` - \`parentid/spanid\` - \`traceflags\`
  
  > **_NOTE:_**  \`sub-field\` term is unofficial, I chose this term for didactic purposes only
  
  for example:
  
  \`\`\` bash
  00-480e22a2781fe54d992d878662248d94-b4b37b64bb3f6141-00
  \`\`\`
  
  - \`version\` (8-bit): trace context version that the system has adopted. The current is \`00\`.
  
  - \`trace-id\` (16-byte array): the ID of the whole trace. It's used to identify a distributed trace globally through a system.
  
  - \`parent-id\` / \`span-id\` (8-byte array): used to identify the parent of the current span on incoming requests or the current span on an outgoing request.
  
  - \`trace-flags\` (8-bit): flags that represent recommendations of the caller. Can be also thought as the caller recommendations and are strict to three reasons: trust and abuse, bug in the caller or different load between caller and callee service.
  
  > **_NOTE:_** all the fields are encoded as \`hexadecimal\`
  
  Therefore, applying the trace context concept in an application like the [Figure 1](#figure-1-distributed-trace) will result in the diagram below:
  
  ### Figure 2 - Propagation fields
  
  ![propagation-fields](https://raw.githubusercontent.com/luizhlelis/trace-context-w3c/main/doc/w3c-trace-context.png)
  
  note that the \`trace-id\` is an identifier of all the trace, the \`parent-id\` identifies a delimited scope of the whole trace. Moreover, the \`traceparent\` along with the \`tracestate\` have been propagated throughout the trace flow.
  
  To describe better the \`traceparent\` dynamics, take a look at the example below, wrote in c#, where two spans scopes are generated and the context is being propagated throughout them:
  
  \`\`\` csharp
  using System;
  using System.Diagnostics;
  
  var upstreamActivity = new Activity("Upstream");
  
  upstreamActivity.Start();
  Console.WriteLine(upstreamActivity.OperationName);
  Console.WriteLine("traceparent: {0}", upstreamActivity.Id);
  CallChildActivity();
  upstreamActivity.Stop();
  
  Console.ReadKey();
  
  void CallChildActivity()
  {
      var downstreamActivity = new Activity("Downstream Dependency");
      
      downstreamActivity.Start();
      Console.WriteLine(downstreamActivity.OperationName);
      Console.WriteLine("traceparent: {0}", downstreamActivity.Id);
      downstreamActivity.Stop();
  }
  \`\`\`
  
  > **_NOTE:_** the \`System.Diagnostics.Activity\` library in .net 5 has already been configured as the w3c standard
  
  even though the example above shows a single process application, that's the pattern specified by the Trace Context standard. Basically, what that program is doing is: first it opens an upstream span scope and print the \`traceparent\` in the stdout, then it calls a downstream method which opens another span scope and also prints its \`traceparent\` and close the scope. After that, the upstream span scope was closed after all of it. The systems output follow below:
  
  \`\`\`bash
  Upstream
  traceparent: 00-3e425f2373d89640bde06e8285e7bf88-9a5fdefae3abb440-00
  
  Downstream Dependency
  traceparent: 00-3e425f2373d89640bde06e8285e7bf88-0767a6c6c1240f47-00
  \`\`\`
  
  note that the \`trace-id\` (3e425f2373d89640bde06e8285e7bf88) is been maintained by the whole trace and the \`parent-id\` is changing based on the span scope (the upstream is equals to 9a5fdefae3abb440 and the downstream is 0767a6c6c1240f47).
  
  In some cases, \`parent-id\` could cause confusion due to its name, but that name is based on the vision of incoming requests. So one must think in the endpoint side, for example: imagine the message that had just arrived in the controller, the \`traceparent\` received in the header hasn't had his \`parent-id\` updated yet by the midleware, so in that vision the id inside \`traceparent\` is the upstream id or also the id of its parent.
  
  There is a Working Draft (WD) document, the [Trace Context Level 2](https://w3c.github.io/trace-context/), that has an response standard where the \`parent-id\` calls \`child-id\`.
  
  > **_NOTE:_** See [w3c process](https://www.w3.org/2017/Process-20170301/#working-draft) for more information about the steps until a document become a w3c recomendation
  
  ## The \`tracestate\` field
  
  The standard uses a fictitious example to describe what is \`tracestate\` for, I will reproduce it in this article. Imagine a client and server system that use different trace vendors, the first is called Congo and the second is called Rojo. A client traced in the Congo system adds in \`tracestate\` the vendor-specific id (with its specific format): \`tracestate: congo=t61rcWkgMzE\`. So the outbound HTTP request will be enriched with the headers below:
  
  \`\`\`bash
  traceparent: 00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01
  
  tracestate: congo=t61rcWkgMzE
  \`\`\`
  
  any other user-supplied information (different from vendor-specific info) should be added in the [baggage](https://w3c.github.io/baggage/) field, that's another standard which is in Working Draft (WD) step of the [w3c process](https://www.w3.org/2017/Process-20170301/#working-draft) (is not a w3c recomendation yet).
  
  ## Trace Context: AMQP protocol
  
  As displayed in [Figure 2](#figure-2-propagation-fields), in a microservice architecture, it's common to propagate messages throw a broker. For that kind of operation, there is another document that specifies the pattern (in case of using AMQP protocol), is the [Trace Context: AMQP protocol](https://w3c.github.io/trace-context-amqp/).
  
  The \`Trace Context: AMQP protocol\` is another example of document in the Working Draft (WD) step of the [w3c process](https://www.w3.org/2017/Process-20170301/#working-draft). That standard specifies the trace context fields placement in the message different from the HTTP standard.
  
  The standard recomends that the fields \`traceparent\` and \`tracestate\` should be added to the message in the \`application-properties\` section by message publisher. On the message readers side, the trace context should be built by reading \`traceparent\` and \`tracestate\` fields from the \`message-annotations\` first and if not exist, from \`application-properties\`. See below the message format in the AMQP protocol:
  
  ### Figure 3 - AMQP message format
  
  ![amqp-message-format](https://raw.githubusercontent.com/luizhlelis/trace-context-w3c/main/doc/amqp-message-format.png)
  
  The reason for the trace context fields placement in the message is that the \`application-properties\` section is defined by the message publisher and the brokers cannot mutate those properties because that section is immutable. On the other hand, the section \`message-annotations\` is designed for message brokers usage. In other words, the fields inside that section can be mutated during the message processing. So it means that in case the need arises to annotate the message inside the middleware as it flows, that must happen in the \`message-annotations\` section, using the fields sent by the publisher in \`application-properties\` as a base.
  
  ## Conclusion
  
  The W3C Trace Context standard came to define a pattern to the distributed tracing process. Currently, there is only one \`W3C Recommendation\` which is for HTTP calls (lauched in february 2020), all the other standards are in working in process (AMQP, MQTT and baggage). It doesn't means that you should avoid to use the standard in a production environment, but keep in mind that some things are going to change and it's important to be up to date with newer releases.
  
  If you got until here and liked the article content, let me know reacting to the current post. You can also open a discussion below, I'll try to answer soon. On the other hand, if you think that I said something wrong, please open an issue in the [article's github repo](https://github.com/luizhlelis/trace-context-w3c). In the next article, I'll show a full distributed trace example using the trace context concept (in a microsservice architecture using \`.NET 5\`). Hope you like it!
  
  ## References
  
  BOGARD, Jimmy. [Building End-to-End Diagnostics and Tracing: Trace Context](https://jimmybogard.com/building-end-to-end-diagnostics-and-tracing-a-primer-trace-context/)
  
  DRUTU, Bogdan; KANZHELEV, Sergey; MCLEAN, Morgan; MOLNAR, Nik; REITBAUER, Alois; SHKURO, Yuri. [W3C Recommendation - Trace Context](https://www.w3.org/TR/trace-context/)
  
  DRUTU, Bogdan; KANZHELEV, Sergey; MCLEAN, Morgan; MOLNAR, Nik; REITBAUER, Alois; SHKURO, Yuri. [W3C Recommendation - Trace Context Level 2](https://w3c.github.io/trace-context/)
  
  GODFREY, Robert; INGHAM, David; SCHLOMING, Rafael. [Advanced Message Queuing Protocol (AMQP) Version 1.0, Part 3: Messaging](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html)
  
  KANZHELEV, Sergey; MCLEAN, Morgan, REITBAUER, Alois. [W3C Editor's draft - Propagation format for distributed trace context: Baggage](https://w3c.github.io/baggage/)
  
  KANZHELEV, Sergey; VASTERS, Clemens. [W3C Editor's draft - Trace Context: AMQP protocol](https://w3c.github.io/trace-context-amqp/)
  
  KANZHELEV, Sergey; VASTERS, Clemens. [W3C Editor's draft - Trace Context: MQTT protocol](https://w3c.github.io/trace-context-mqtt/)
  `,
  "dotnet-docker-images-deleted": `
  # .NET Core 2.1 container images were deleted from Docker Hub!

  If you started receiving errors when pulling old versions of dotnet docker images (like the \`.NET 2.1\`), it's because Microsoft deleted them from Docker Hub on August 21st, 2021. That date is not a coincidence, the \`.NET Core 2.1\` reached end of support in the same date. For more details take a look at the official [dotnet announcement](https://github.com/dotnet/announcements/issues/197) or also the [dotnet blog](https://devblogs.microsoft.com/dotnet/net-core-2-1-container-images-will-be-deleted-from-docker-hub/).
  
  In my case, the error below was thrown when pulling the \`microsoft/dotnet:2.2-aspnetcore-runtime\` image:
  
  \`\`\`bash
  Error response from daemon: pull access denied for
  microsoft/dotnet, repository does not exist or may
  require 'docker login': denied: requested access to
  the resource is denied
  \`\`\`
  
  As mentioned before, the reason was: microsoft moved the \`out of support\` images from docker hub to [microsoft container registry](https://github.com/microsoft/containerregistry) (MCR). To solve that problem, I updated the image to \`mcr.microsoft.com/dotnet/core/runtime:2.2\`. So, instead of pulling images from docker hub (\`microsoft/dotnet\`) you should pull them from MCR (\`mcr.microsoft.com\`), just like described below:
  
  \`\`\`bash
  microsoft/dotnet:2.1-sdk -> mcr.microsoft.com/dotnet/sdk:2.1
  microsoft/dotnet:2.1-aspnetcore-runtime -> mcr.microsoft.com/dotnet/aspnet:2.1
  microsoft/dotnet:2.1-runtime -> mcr.microsoft.com/dotnet/runtime:2.1
  microsoft/dotnet:2.1-runtime-deps -> mcr.microsoft.com/dotnet/runtime-deps:2.1
  \`\`\`
  
  > **NOTE**: see the full list of \`from docker hub to MCR images\` [here](https://devblogs.microsoft.com/dotnet/net-core-2-1-container-images-will-be-deleted-from-docker-hub/#pulling-images-from-mcr)
  
  Maybe you're asking yourself: why microsoft announced that they removed the 2.1 images from docker hub but not the 2.2 images? The response is simple: \`.NET 2.2\` was deprecated in December 23, 2019, so microsoft don't need to announce as they are not supporting it anymore 🤷‍♂️
  
  > **NOTE**: it's strongly recommended move to later \`.NET\` versions instead of using \`out of support\` versions like 2.1 or 2.2
  `,
  "typesense": `
  # ⚡ 🔍 Typesense search engine: an easier-to-use alternative to ElasticSearch
  
  In a daily development process, it's common the need to search a specific term in a large amount of data. The search engine tools came to solve this kind of problem and one of the most famous is called [ElasticSearch](https://github.com/elastic/elasticsearch). If you have already worked with ElasticSearch you probably know that it's such a powerful tool, but it's also complex and has a steep learning curve. For example, doing an in-house deployment of ElasticSearch you will face a high production ops overhead dealing with over 3000 configuration parameters.
  
  Built in C++, [Typesense](https://github.com/typesense/typesense) is an easier-to-use alternative to ElasticSearch. The community describes it as an open-source, fast, typo tolerant, and easy-to-use search engine. The current article is a quick introduction to \`Typesense\` using a search engine example for the \`Nobel Prize Winners\`.
  
  ## Server configuration
  
  Just like most search engine tools, \`Typesense\` is a NoSql document-oriented database. For the current example, I'll self-host \`Typesense\` on my local machine using the official [docker image](https://hub.docker.com/r/typesense/typesense/), as you can see in the example [source code](https://github.com/luizhlelis/typesense-playground). There are [few parameters](https://typesense.org/docs/0.21.0/api/server-configuration.html#using-command-line-arguments) to configure the \`Typesense\` server, but you could let the default values and just configure the \`--api-key\` (admin API key that allows all operations) and the \`--data-dir\` (path to the directory where data will be stored on disk) parameters. Take a look at the \`typesense\` service on \`docker-compose\`:
  
  \`\`\`yml
    typesense:
      image: typesense/typesense:0.22.0.rcs11
      container_name: typesense
      environment:
        - TYPESENSE_API_KEY=Hu52dwsas2AdxdE
        - TYPESENSE_DATA_DIR=/typesense-data
      volumes:
        - "./typesense-data:/typesense-data/"
      ports:
        - "8108:8108"
  \`\`\`
  
  > **NOTE**: when using \`environment variables\`, you need to add the \`TYPESENSE_\` prefix to the variable name
  
  One important thing to note is: I choose to create a volume for the \`typesense-data\` folder, so the data stored in the container will be persisted locally. Along with the \`typesense\` service, I registered a \`seed-data\` service on \`docker-compose.yml\` to seed the \`Nobel Prize Winners\` data in the \`Typesense\` server:
  
  \`\`\`yml
    seed-data:
      build:
        context: .
        dockerfile: Dockerfile
      container_name: seed-data
      depends_on:
        - typesense
      environment:
        - TYPESENSE_API_KEY=Hu52dwsas2AdxdE
        - SERVER_HOSTNAME=typesense
      volumes:
        - "./scripts:/app/"
        - "./seed-data:/seed-data/"
      command:
        [
          "/app/wait-for-it.sh",
          "typesense:8108",
          "-s",
          "-t",
          "40",
          "--",
          "/app/batch-import-docs.sh"
        ]
  \`\`\`
  
  The volumes listed above are: a path to the scripts ([wait-for-it.sh](https://github.com/luizhlelis/typesense-playground/blob/main/src/scripts/wait-for-it.sh) that waits for \`typesense\` to respond on it's \`port\` and [batch-import-docs.sh](https://github.com/luizhlelis/typesense-playground/blob/main/src/scripts/batch-import-docs.sh) which seed the data) and also a path to the dataset formatted as [JSONLines](https://jsonlines.org/).
  
  ## Create collection and import documents
  
  Before starting to import the documents, it's important to create a \`collection\`. In \`Typesense\`, a group of related documents is called \`collection\` and \`schema\` is the name of the fields from the documents added in a \`collection\`. It might help to think of a \`schema\` as the "types" in a strongly-typed programming language. The most important thing that you should keep in mind is: all fields that you mention in a \`collection\`'s \`schema\` will be indexed in memory. Take a look at the \`prizes\` collection created for the current example:
  
  \`\`\`bash
  curl "http://\${SERVER_HOSTNAME}:8108/collections" \\
         -X POST \\
         -H "Content-Type: application/json" \\
         -H "X-TYPESENSE-API-KEY: \${TYPESENSE_API_KEY}" \\
         -d '{
           "name": "prizes",
           "default_sorting_field": "year",
           "fields": [
             {"name": "id", "type": "string" },
             {"name": "year", "type": "int64" },
             {"name": "category", "type": "string", "facet": true },
             {"name": "laureates_full_name", "type": "string[]" }
           ],
           "default_sorting_field": "year"
         }'
  \`\`\`
  
  >**NOTE**: indexes are gonna improve the execution of queries in terms of performance. If an appropriate index exists for a query, \`Typesense\` will use it to limit the number of documents to inspect
  
  The \`schema\` above has four indexed fields: \`id\`, \`year\`, \`category\` and \`laureates_full_name\`, but if you look at the [dataset to be imported](https://github.com/luizhlelis/typesense-playground/blob/main/src/seed-data/documents.jsonl), you'll notice some extra fields, for example: \`laureates.motivation\`, \`laureates.share\`, \`laureates.surname\`. Those fields will be stored on disk, but will not take up any memory.
  
  For the dataset import, I'm using the [import API](https://typesense.org/docs/0.21.0/api/documents.html#import-documents) to index multiple documents in a batch:
  
  \`\`\`bash
  curl -H "X-TYPESENSE-API-KEY: \${TYPESENSE_API_KEY}" -X POST --data-binary @../seed-data/documents.jsonl \
  "http://\${SERVER_HOSTNAME}:8108/collections/prizes/documents/import?action=create"
  \`\`\`
  
  Now that all the steps are clear, just type the command below to up the \`typesense\` server and also seed the data inside it:
  
  \`\`\`bash
  docker-compose up --build
  \`\`\`
  
  ## Searching for the Nobel Prize Winners
  
  Now that the \`typesense\` server is up and running, let's start searching for the Nobel Prize winners. First, export the environment variable \`TYPESENSE_API_KEY\` to use it locally as a typesense client:
  
  \`\`\`bash
  export TYPESENSE_API_KEY=Hu52dwsas2AdxdE
  \`\`\`
  
  Then, use the [search API](https://typesense.org/docs/0.21.0/api/documents.html#search) to search for documents. For example, imagine that you want to search for the Marie Curie prize, type the command below locally:
  
  \`\`\`bash
  curl -H "X-TYPESENSE-API-KEY: \${TYPESENSE_API_KEY}" \
  "http://localhost:8108/collections/prizes/documents/search\
  ?q=Curii&query_by=laureates_full_name\
  &sort_by=year:desc"
  \`\`\`
  
  Did you notice the typo in the query text? Instead of \`Curie\`, \`Curii\` was sent in the query. No big deal, \`Typesense\` handles typographic errors, take a look at the documents returned (the response body has been cut for didactic purposes only):
  
  \`\`\`json
  {
    "facet_counts": [],
    "found": 2,
    "hits": [
      {
        "document": {
          "category": "chemistry",
          "id": "55",
          "laureates": [
            {
              "firstname": "Marie",
              "id": "6",
              "motivation": "in recognition of her services to the advancement of chemistry by the discovery of the elements radium and polonium, by the isolation of radium and the study of the nature and compounds of this remarkable element",
              "share": "1",
              "surname": "Curie"
            }
          ],
          "laureates_full_name": [
            "Marie Curie"
          ],
          "year": 1911
        }
      },
      {
        "document": {
          "category": "physics",
          "id": "12",
          "laureates": [
            {
              "firstname": "Henri",
              "id": "4",
              "motivation": "in recognition of the extraordinary services he has rendered by his discovery of spontaneous radioactivity"",
              "share": "2",
              "surname": "Becquerel"
            },
            {
              "firstname": "Pierre",
              "id": "5",
              "motivation": "in recognition of the extraordinary services they have rendered by their joint researches on the radiation phenomena discovered by Professor Henri Becquerel"",
              "share": "4",
              "surname": "Curie"
            },
            {
              "firstname": "Marie",
              "id": "6",
              "motivation": "in recognition of the extraordinary services they have rendered by their joint researches on the radiation phenomena discovered by Professor Henri Becquerel"",
              "share": "4",
              "surname": "Curie"
            }
          ],
          "laureates_full_name": [
            "Henri Becquerel",
            "Pierre Curie",
            "Marie Curie"
          ],
          "year": 1903
        }
      }
    ]
  }
  \`\`\`
  
  ## Conclusion
  
  \`Typesense\` has been turning into a nice alternative to search engines like Algolia and ElasticSearch. Its simple server setup and intuitive API turns the navigation much easier. For the current example, I used CURL to interact with \`Typesense\` Server directly, but there are many [clients and integrations](https://github.com/typesense/typesense#api-clients) developed in your favorite language.
  
  Now, I want to know your opinion, if you're using \`Typesense\` in production [let the community knows](https://github.com/typesense/typesense/issues/140)! If you got here and liked the article content, let me know by reacting to the current post. You can also open a discussion below, I'll try to answer it soon. On the other hand, if you think that I said something wrong, please open an issue in the [article's github repo](https://github.com/luizhlelis/typesense-playground).
  
  `
}
export default dict

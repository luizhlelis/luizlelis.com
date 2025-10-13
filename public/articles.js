var dict = {
  "open-telemetry-01": ` # 🔭 OpenTelemetry Journey #01 - Important concepts

  First of all, let's start with the basics. There are some important concepts to be clarified before we dive into the OpenTelemetry world. The vast majority of the naming conventions and concepts are from projects and papers that inspired OpenTelemetry, such as [OpenTracing](https://opentracing.io/), [OpenCensus](https://opencensus.io/) and [Dapper](https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/).
  
  ## What is Observability?
  
  In control theory, observability is a measure of how well the internal states of a system can be inferred from knowledge of its external outputs. Making a relationship with software systems, observability is the ability to understand the internal state of a system by examining telemetry data. This telemetry data is what we call [signals](#what-are-signals).
  
  In order to understand the internal state of a system, the application must be properly instrumented to emit signals enough to provide a clear picture of what is happening.
  
  ## Context propagation
  
  Context propagation is the mechanism that allows the correlation of signals emitted by different parts of a system. It is essential to understand the flow of a request through a distributed system.
  
  ![Context propagation](https://raw.githubusercontent.com/luizhlelis/luizlelis.com/main/src/assets/context-propagation.webp)
  
  Basically, to propagate a context, the upstream service must inject the context into the request, and the downstream service must extract the context from the request. That propagation is handled by the instrumentation libraries, but can be manually implemented as well through the Propagation APIs.
  
  ## Spans
  
  A span represents a single operation, also known as a unit of work, from a distributed transaction. It is composed of a name, a start time and other time-related data, structured log data and metadata (also known as span attributes) that can provide additional information to the tracked operation.
  
  ![Spans](https://raw.githubusercontent.com/luizhlelis/luizlelis.com/main/src/assets/span.webp)
  
  ## What are Signals?
  
  Signals are outputs from a system that can be used to understand its internal state. Currently, OpenTelemetry supports traces, metrics, logs and baggage (there is an ongoing effort to [support profiling](https://opentelemetry.io/blog/2024/opentelemetry-announced-support-for-profiling/) as well).
  
  ### Traces
  
  Traces are a way to follow the path of a request through a distributed system. They are composed of spans, which represent the operations that are part of the request.
  
  ### Metrics
  
  Metrics represent a measurement captured at runtime. They are the most important indicators of availability, performance and resource usage of a system. Some important examples of metrics are: throughput, response time, error rate, CPU utilization, Memory utilization, etc.
  
  ### Logs
  
  Maybe this is the most familiar signal for developers. Logs are text records with a timestamp that can be used to understand the behavior of a system. They are useful to understand the context of a specific operation.
  
  OpenTelemetry uses a different approach to handle this signal. As there are already many logging libraries available, OpenTelemetry acts as a bridge between those logs solutions and the OpenTelemetry ecosystem.
  
  ### Baggage
  
  Baggage is a way to propagate contextual information through the system. It is a key-value pair store that is attached to a span context and must be propagated through the system. The OpenTelemetry documentation has a [great example](https://opentelemetry.io/docs/concepts/signals/baggage/) about it:
  
  > imagine you want to have a \`CustomerId\` attribute on every span in your trace, which involves multiple services; however, \`CustomerId\` is only available in one specific service. To accomplish your goal, you can use OpenTelemetry Baggage to propagate this value across your system.
  
  ## Instrumentation
  
  Instrumentation is the process of making your system observable by enabling applications to emit signals. OpenTelemetry provides two instrumentation approaches: \`Code-based\` and \`Zero-code\`.
  
  ### Code-based instrumentation
  
  Code-based instrumentation is the process of adding code to your application to emit signals. In this approach, you must import the OpenTelemetry libraries to your service code. This approach is more flexible because you can customize the instrumentation as you want or use third-party libraries that are only available for code-based instrumentation, besides, your application’s code is not typically instrumented and to instrument it you’ll need to use code-based instrumentation. On the other hand, you are adding some infrastructure responsibilities to your business code.
  
  ### Zero-code instrumentation
  
  Zero-code approach, also known as automatic instrumentation, allows you to add observability to your application without the need to write code. This approach is more straightforward and less error-prone, but it is less flexible than code-based instrumentation. In this approach, the OpenTelemetry capabilities are added to your application as an agent or agent-like installation.
  
  Maybe you are asking yourself: "How does the zero-code instrumentation work?". The zero-code instrumentation mechanisms may differ by language, ranging from bytecode manipulation, monkey patching, or eBPF to inject calls to the OpenTelemetry API and SDK into your application.  Currently, the automatic instrumentation is available for the following languages:
  
  - [.NET](https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation)
  - [Java](https://github.com/open-telemetry/opentelemetry-java-instrumentation)
  - [JavaScript](https://github.com/open-telemetry/opentelemetry-js)
  - [PHP](https://github.com/open-telemetry/opentelemetry-php-instrumentation)
  - [Python](https://github.com/open-telemetry/opentelemetry-python)
  - [Go](https://github.com/open-telemetry/opentelemetry-go-instrumentation)
  
  ## Conclusion
  
  In this article, we covered some important concepts that are essential to understand before diving into the OpenTelemetry world. We talked about observability, context propagation, spans, signals, and instrumentation. In the next articles, we will dive deeper into the OpenTelemetry ecosystem, exploring the OpenTelemetry Collector and the observability data pipeline. If you have any questions or suggestions, please let me know in the comments below.  
  `,

  "open-telemetry-00": ` # 🔭 OpenTelemetry Journey #00 - Introduction to OpenTelemetry

  This article is the first in a series about OpenTelemetry. The goal is to provide a comprehensive guide for understanding and using OpenTelemetry in your applications.
  
  First things first, nothing better than using the [definition from the official website](https://opentelemetry.io/docs/what-is-opentelemetry/) to start this journey:
  
  > OpenTelemetry is an Observability framework and toolkit designed to create and manage telemetry data such as traces, metrics, and logs.
  
  This means OpenTelemetry provides not only a [specification](https://github.com/open-telemetry/opentelemetry-specification) defining the contract between applications, collectors, and telemetry databases, but also APIs, SDKs, and tools like instrumentation libraries (for different languages), collectors, and operators. OpenTelemetry is open-source and vendor-agnostic, making it independent of any specific vendor or cloud provider.
  
  OpenTelemetry resulted from merging two important projects that are now archived: [OpenTracing](https://opentracing.io/) and [OpenCensus](https://opencensus.io/). The project is incubated by the [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/projects/) and backed by a strong community. The CNCF, part of the Linux Foundation, hosts critical components of global technology infrastructure, including Kubernetes and Prometheus. Currently, OpenTelemetry is the second most active CNCF project by contributor count, behind only Kubernetes. Being foundation-governed with no commercial interests means the project license won't easily change (unlike what happened with tools like [Elastic](https://www.elastic.co/blog/doubling-down-on-open)) and won't be abandoned by a single company.
  
  ## Why OpenTelemetry?
  
  There are several reasons to use OpenTelemetry in your applications. Here are the most important:
  
  - **Vendor-agnostic**: OpenTelemetry works in any environment, from on-premises to cloud providers, without vendor lock-in;
  - **Open-source**: With strong community backing, OpenTelemetry's license remains stable and the project won't be abandoned by a single company;
  - **Standardization**: OpenTelemetry provides a standard way to collect, process, and export telemetry data, enabling consistent instrumentation across different environments;
  
  You might wonder: "I've already instrumented my applications with vendor-specific libraries and use their agents and monitoring tools. Why should I switch to OpenTelemetry?" The answer: you might not need to. Updating your observability infrastructure is complex and challenging. However, if you're starting from scratch or unhappy with your current setup, OpenTelemetry is the best choice regardless of your backend telemetry tool. Check the available exporters in the [collector contrib section](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter). If your backend tracing tool isn't listed, it probably already uses the [Open Telemetry Protocol (OTLP)](https://github.com/open-telemetry/opentelemetry-proto/blob/main/docs/specification.md), allowing you to use the [core collector](https://github.com/open-telemetry/opentelemetry-collector/tree/main/exporter/otlpexporter). Otherwise, consider switching your backend telemetry tool or contributing a new exporter to the project.
  
  I've mentioned several concepts and terms that I'll explain in upcoming posts, so don't worry if everything isn't clear yet. Hope you enjoyed reading, and see you in the next post!
  `,

  "outbox-pattern": `# 📦 Data consistency, outbox pattern and idempotency in a microservice architecture

  ## CAP Theorem
  
  In the late 90s, scientist Eric Brewer first presented the CAP Theorem. The theorem states the "two out of three" concept: any distributed system can provide only two of these three guarantees:
  
  - Consistency: every request receives the most recent data or an error;
  - Availability: every request receives a response, though it may not contain the most recent data;
  - Partition tolerance: the system continues operating despite messages being dropped or delayed by the network between nodes.
  
  Consider a web app with network connections between a database and back-end application, or between services in a microservice architecture. The app must be partition tolerant, meaning it continues working correctly even when the network is partitioned. After a partition occurs, you must choose: either cancel the operation to ensure consistency, or proceed with the operation to provide availability but risk inconsistency.
  
  Here's an example to clarify the CAP theorem. Imagine an e-commerce system where finishing an order involves two services: \`order\` and \`catalog\`. The \`order\` service must check product availability by calling the \`catalog\` API before completing the order. If the \`catalog\` API becomes unavailable (a partition occurs), the system can respond in two ways:
  
  ### [Consistency] Choose the strong consistency returning an error
  
  ![consistent-system](https://raw.githubusercontent.com/luizhlelis/cap-playground/main/assets/consistent-system.webp)
  
  ### [Availability] Giving up the strong consistency returning to the client that eventually the request will be processed
  
  ![available-system](https://raw.githubusercontent.com/luizhlelis/cap-playground/main/assets/available-system.webp)
  
  The pattern discussed in this article is an eventual consistency pattern. The outbox pattern trades strong consistency for availability.
  
  ## Outbox pattern
  
  The outbox pattern only makes sense for distributed systems; it's irrelevant for monolithic architectures. The pattern solves this problem: how do we reliably and atomically update the database while sending messages/events?
  
  The pattern's solution is relatively straightforward and can be described in these steps:
  
  - A service persisting data in a database also inserts messages/events into an outbox table as part of the local transaction;
  - The service appends messages/events to an attribute of the record being updated;
  - A separate process called \`Message Relay\` publishes the events from the database to a message broker;
  - If something goes wrong, the \`Message Relay\` process retries sending the event until reaching the configured limit;
  - Messages/events are also stored on the consumer side.
  
  ![outbox-pattern](https://raw.githubusercontent.com/luizhlelis/cap-playground/main/assets/outbox-pattern.webp)
  
  > **Edited version from:** https://github.com/dotnetcore/CAP
  
  While the outbox pattern guarantees data consistency between services, what happens if events are consumed twice? This is where idempotency becomes crucial.
  
  ## Idempotency
  
  With a broker providing \`at least once delivery\`, messages can be persisted multiple times in two situations:
  
  - The producer sends a message to the broker, and the consumer stores the data but doesn't return an \`ack\` in time. The broker then assumes the message wasn't processed and sends it again;
  - In the outbox scenario, the producer stores the message in the \`outbox table\` and sends it to the broker, but fails to update the \`outbox table\` to mark it as published. As a result, it keeps resending the message until the \`outbox table\` is updated.
  
  > **NOTE**: that could be even worse in a multiprocessing scenario
  
  ![idempotency](https://raw.githubusercontent.com/luizhlelis/cap-playground/main/assets/idempotency.webp)
  
  To make your consumer idempotent, register processed message/event IDs in the database. When processing new messages, the consumer can detect and discard duplicates.
  
  ## Conclusion
  
  The outbox pattern is an eventual consistency pattern that prioritizes system availability, but it's not a silver bullet. When using it, handle potential duplicate message consumption by implementing idempotent consumers.
  
  There are many libraries in \`.NET\` that helps you implementing the \`outbox pattern\` like: [MassTransit](https://github.com/MassTransit/MassTransit), [NServiceBus](https://github.com/Particular/NServiceBus), [CAP](https://github.com/dotnetcore/CAP). Talking about idempotency, a special mention to a specific lib from a big friend that runs on top of \`CAP\` which is called [Ziggurat](https://github.com/rafaelpadovezi/Ziggurat).
  
  If you've made it this far and enjoyed the article, please let me know by reacting to this post. Feel free to open a discussion below, I'll respond as soon as possible. In the next article, I'll show you the code for building a system using the \`outbox pattern\` and \`idempotency\` with \`.NET\`, \`CAP\`, and \`Ziggurat\`. Hope you enjoy it!
  
  ## References
  
  [CAP Playground, 📤 Just playing a bit with CAP and outbox pattern](https://github.com/luizhlelis/cap-playground)
  
  **[PT-BR]** JS+, Data consistency, outbox pattern and idempotency in a microservice architecture with .NET; [JS+ TechTalks #22 - Edição Lisboa](https://www.youtube.com/watch?v=rqade8-xjyc)
  
  Richardson, Chris; [Pattern: Idempotent Consumer](https://microservices.io/patterns/communication-style/idempotent-consumer.html)
  
  Richardson, Chris; [Pattern: Transactional outbox](https://microservices.io/patterns/data/transactional-outbox.html)
  `,

  "go-lang-self-signed": `
  # 🔐 Building a self signed server in golang

  This article will help you create a self-signed server in \`golang\`. While there are many ways to use certificates for building and running an \`https\` server, this article focuses on one approach: \`self-signed\` certificates using the openssl tool. You can find all the source code in the public [github repository](https://github.com/luizhlelis/go-lang-https-self-signed).
  
  ## Why https?
  
  First, let's review some key concepts. The Hypertext Transfer Protocol ([HTTP](https://tools.ietf.org/html/rfc2616)) has been a standard internet protocol since 1990. The problem with plain HTTP is that messages between server and client aren't encrypted, allowing anyone who intercepts them to read and modify the data, potentially masquerading as one of the involved parties. To prevent attacks like [man-in-the-middle](https://tools.ietf.org/html/rfc4949) and provide secure communication, Netscape introduced the Secure Sockets Layer ([SSL](https://tools.ietf.org/html/rfc6101)) in 1994, pioneering secure communication protocols. SSL was later succeeded by Transport Layer Security ([TLS](https://tools.ietf.org/html/rfc8446)). TLS is the channel-oriented security protocol currently used on the internet, consisting of two main protocols: the handshake protocol and the record protocol.
  
  The TLS Handshake protocol authenticates the two endpoints, negotiates cryptographic parameters, and generates keying material. The record protocol then uses these parameters to protect traffic between the endpoints.
  
  ## Why self signed?
  
  By default, your operating system trusts a set of certification authorities (CAs) like GlobalSign, Let's Encrypt, Digicert, and GoDaddy. Self-signed certificates aren't signed by any CA; instead, they're signed with their own private key rather than being requested from a CA. In this case, the client must explicitly trust the certificate issued by the server.
  
  The first question to ask is: why do you need a self-signed certificate? There are limited use cases, and I've never encountered a reason to use one in production. So why this article? Some scenarios require an \`https\` endpoint for local development. In my case, I needed one to integrate a local application with a cloud service requiring \`https\`. While some frameworks and SDKs in other languages provide native \`https\` endpoints with self-signed certificates (like [JDK](https://www.oracle.com/java/technologies/downloads/) and [.NET Core](https://dotnet.microsoft.com/en-us/download)), I couldn't find an equivalent solution in \`golang\`.
  
  > **NOTE:** For production \`https\`, I strongly recommend using a certificate signed by a CA (try cloud solutions like [AWS Certificate Manager](https://aws.amazon.com/pt/certificate-manager/) or open-source tools like [certbot](https://certbot.eff.org/)). Self-signed certificates carry security risks—learn more [here](https://www.keyfactor.com/blog/self-signed-certificate-risks/).
  
  ## Running the project
  
  > "Talk is cheap, show me the code" - Linus Torvalds
  
  To follow along, clone [this github repo](https://github.com/luizhlelis/go-lang-https-self-signed). The example includes a server and client called \`https-server\` and \`https-client\` respectively. Each runs in its own container. The server provides a REST API written in golang and creates the self-signed certificate. This certificate protects two hostnames: \`localhost\` and \`https-server\`. This multi-domain approach is enabled by [Subject Alternative Names](https://www.digicert.com/faq/subject-alternative-name.htm) (SANs). The diagram below shows the architecture:
  
  ![certificate-diagram](https://raw.githubusercontent.com/luizhlelis/go-lang-https-self-signed/main/docs/cert-diagram.webp)
  
  As shown above, the server generates the certificate and clients trust it (whether running in a container or on the host). To start the client and server containers, run:
  
  \`\`\` bash
  docker-compose up
  \`\`\`
  
  ## Server
  
  This command first starts the server container and executes commands from [generate-certificate.sh](https://github.com/luizhlelis/go-lang-https-self-signed/blob/main/server/scripts/generate-certificate.sh). This bash file contains [openssl](https://www.openssl.org/) commands to create the self-signed certificate. First, it generates \`servercert.key\` (the private key) and \`servercert.csr\` (the certificate signing request containing the public key). The \`CN\` field in \`-subj\` is crucial—some browsers like Chrome require it (\`CN\` stands for Common Name, the domain you want SSL-secured). The last command generates \`servercert.crt\`, the self-signed certificate signed with your \`servercert.key\` private key. The \`x509\` flag specifies the standard X.509 format for SSL/TLS certificates. Finally, \`go run main.go\` starts the \`https\` server. Here are the bash commands:
  
  \`\`\`bash
  apk update && apk add openssl && rm -rf /var/cache/apk/*
  openssl req -new -subj "/C=US/ST=California/CN=localhost" \\
      -newkey rsa:2048 -nodes -keyout "$FILE_CERT_NAME.key" -out "$FILE_CERT_NAME.csr"
  openssl x509 -req -days 365 -in "$FILE_CERT_NAME.csr" -signkey "$FILE_CERT_NAME.key" -out "certificates/$FILE_CERT_NAME.crt" -extfile "self-signed-cert.ext"
  \`\`\`
  
  The \`ext\` file contains all SANs protected by the certificate:
  
  \`\`\`txt
  subjectAltName = @alt_names
  [alt_names]
  DNS.1 = localhost
  DNS.2 = https-server
  \`\`\`
  
  With the certificate ready, you can serve your https server. In \`main.go\`, the \`ListenAndServeTLS\` method uses the cert and key to serve the \`https\` self-signed server:
  
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
  
  Since the cert and key paths come from the \`.env\` file, declare them as:
  
  \`\`\` env
  tls-certificate="certificates/servercert.crt"
  tls-key="servercert.key"
  \`\`\`
  
  ## Client
  
  The client container mounts a volume with the server certificate path: \`./server/certificates:/certificates\`. This is necessary because the client must trust the certificate to make \`https\` calls to the server. The \`update-ca-certificates\` command, executed in [trust-server-certificate.sh](https://github.com/luizhlelis/go-lang-https-self-signed/blob/main/client/scripts/trust-server-certificate.sh#L11), adds the certificate to the system's trust store. After this, the client can call the server with https (the handshake proceeds normally). The \`https-client\` container calls the \`/home\` endpoint twice after trusting the certificate. See the \`curl\` calls in [get-server-home.sh](https://github.com/luizhlelis/go-lang-https-self-signed/blob/main/client/get-server-home.sh):
  
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
  
  As mentioned, you must trust the server certificate in your local trust store to use https. For Linux-based systems, run the commands in \`trust-server-certificate.sh\`. For other systems, follow these guides:
  
  - [Mac Os](https://tosbourn.com/getting-os-x-to-trust-self-signed-ssl-certificates/)
  
  - [Windows](https://superuser.com/questions/370217/trust-ssl-certificate-to-local-system-account)
  
  - [Linux](https://unix.stackexchange.com/questions/90450/adding-a-self-signed-certificate-to-the-trusted-list)
  
  Calling a server endpoint before trusting the certificate produces this browser error:
  
  ![before-trust](https://raw.githubusercontent.com/luizhlelis/go-lang-https-self-signed/main/docs/before-trust.webp)
  
  After trusting the certificate locally, you'll receive a 200 OK response:
  
  ![after-trust](https://raw.githubusercontent.com/luizhlelis/go-lang-https-self-signed/main/docs/after-trust.webp)
  
  Expanding the certificate shows all domains secured by the self-signed certificate:
  
  ![certificate-sans](https://raw.githubusercontent.com/luizhlelis/go-lang-https-self-signed/main/docs/certificate-sans.webp)
  
  The server stdout reflects this behavior—showing a handshake error before trusting the certificate, and successful handshake after:
  
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

  In my last [article](/tracecontext), I wrote about the W3C trace context standard and the problems it solves. This article demonstrates trace context usage in a microservice architecture. For this practical example, I developed all applications using C# with \`.NET 5\` ([sample WeatherForecast web API](https://docs.microsoft.com/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio)) and ran them locally via docker-compose. Hope you enjoy it!
  
  ## Application architecture
  
  The main objective is to propagate a message with \`traceparent\` id through two APIs and one worker using the [W3C trace context](https://www.w3.org/TR/trace-context) standard. The \`first-api\` calls the \`second-api\` via HTTP, while the \`second-api\` communicates asynchronously with the \`worker\` through a message broker ([RabbitMQ](https://www.rabbitmq.com/)). [Zipkin](https://zipkin.io/) serves as the trace system (or \`vendor\` as the standard calls it), collecting application traces and building the distributed tracing diagram:
  
  ### Figure 1 - Distributed trace
  
  ![Distributed Trace](https://raw.githubusercontent.com/luizhlelis/dotnet-trace-context/main/doc/w3c-trace-context.webp)
  
  The first and second APIs have the [same code base](https://github.com/luizhlelis/dotnet-trace-context/tree/main/src), but they're being deployed in different containers.
  
  ## OpenTelemetry
  
  An important framework used in this article for context propagation is [OpenTelemetry](https://opentelemetry.io/). As the documentation states:
  
  > OpenTelemetry is a set of APIs, SDKs, tooling and integrations that are designed for the creation and management of telemetry data such as traces, metrics, and logs.
  
  [OTel](https://opentelemetry.io/docs/concepts/glossary/) provides vendor-agnostic instrumentation libraries to generate, emit, collect, process, and export telemetry data. OTel consists of multiple components: proto, specification, collector, and instrumentation libraries. Due to OpenTelemetry's complexity, I'll only cover it briefly here, as it deserves its own article.
  
  \`W3C TraceContext\` is one of the [propagators](https://github.com/open-telemetry/opentelemetry-specification/blob/b46bcab5fb709381f1fd52096a19541370c7d1b3/specification/context/api-propagators.md#propagators-distribution) maintained and distributed as extension packages by OTel. This is why OTel and W3C TraceContext are closely related.
  
  ## Talk is cheap, show me the code
  
  > The source code could be found in [this github repo](https://github.com/luizhlelis/dotnet-trace-context).
  
  The default diagnostics library in \`.NET 5\`, [System.Diagnostics](https://docs.microsoft.com/en-us/dotnet/api/system.diagnostics?view=net-5.0), already propagates context based on the W3C TraceContext specification. Previous \`.NET Core\` versions used a [hierarchical identifier format](https://github.com/dotnet/runtime/blob/main/src/libraries/System.Diagnostics.DiagnosticSource/src/ActivityUserGuide.md#id-format) by default. Starting with \`.NET Core 3.0\`, you can configure the identifier format. See [this](https://stackoverflow.com/questions/61251914/how-can-i-access-w3c-tracecontext-headers-in-a-net-core-3-1-application/67086305#67086305) Stack Overflow question for configuring W3C format in earlier \`.NET Core\` versions.
  
  The \`first-api\` and the \`second-api\` showed in \`Figure 1\` requires three packages to work properly with \`OpenTelemetry\`:
  
  \`\`\` csharp
      <PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.0.0-rc7" />
      <PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.0.0-rc7" />
      <PackageReference Include="OpenTelemetry.Exporter.Zipkin" Version="1.1.0" />
  \`\`\`
  
  The \`OpenTelemetry.Extensions.Hosting\` package registers OpenTelemetry in the application using Dependency Injection. The \`OpenTelemetry.Instrumentation.AspNetCore\` and \`OpenTelemetry.Exporter.Zipkin\` packages represent two core OpenTelemetry components: the instrumentation library and the collector. The [instrumentation library](https://opentelemetry.io/docs/concepts/instrumenting/) injects observable information from libraries and applications into the OpenTelemetry API. The [collector](https://opentelemetry.io/docs/concepts/data-collection/) provides vendor-agnostic implementation for receiving, processing, and exporting telemetry data. The exporter sends the data to its destination (Zipkin in our example). OTel's dependency injection is configured in \`Startup.cs\`:
  
  \`\`\` csharp
      services.AddOpenTelemetryTracing(builder => builder
          .AddAspNetCoreInstrumentation()
          .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(Configuration["Zipkin:ServiceName"]))
          .AddZipkinExporter()
      );
  
      services.Configure<ZipkinExporterOptions>(Configuration.GetSection("Zipkin"));
  \`\`\`
  
  Zipkin receives telemetry data at the \`/api/v2/spans\` endpoint. The \`first-api\` and \`second-api\` share the [same code base](../src/OpenTelemetryApi). In this example, a client (\`curl\`) calls the first API's \`WeatherForecast\` route, which then calls the second API's \`PublishInQueue\` route. Both controller methods print \`traceparent\` and \`tracestate\` to stdout:
  
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
  
  Note that I use a \`propagator\` to inject context into a carrier. The [OpenTelemetry Specification](https://github.com/open-telemetry/opentelemetry-specification) defines propagators as "objects used to read and write context data to and from messages exchanged by applications." The spec recommends that propagators define \`Inject\` and \`Extract\` operations. Since \`PublishInQueue\` publishes messages, the \`Inject\` operation fits here, while \`Extract\` suits the \`worker\`.
  
  Additionally, the propagation fields (\`traceparent\` and \`tracestate\`) are added to the message header. In the [previous article](https://dev.to/luizhlelis/using-w3c-trace-context-standard-in-distributed-tracing-3743), I mentioned that the [standard](https://w3c.github.io/trace-context-amqp/) (still in Working Draft status) recommends adding propagation fields to the \`application-properties\` section. However, for this example, I propagate context in the message header for AMQP calls, following [the dotnet OpenTelemetry example](https://github.com/open-telemetry/opentelemetry-dotnet/blob/e3df42bfc15dc1d4dff01d655f669f7c27e35312/examples/MicroserviceExample/Utils/Messaging/MessageSender.cs#L78). Remember that \`Trace Context: AMQP protocol\` isn't a W3C Recommendation yet. Here's where the propagation fields are added:
  
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
  
  By default, ASP.NET Core starts an \`Activity\` span when the [request begins](https://github.com/dotnet/aspnetcore/blob/867cec475d18892b828ac44a82d74eccfbbb0e49/src/Hosting/Hosting/src/Internal/HostingApplicationDiagnostics.cs#L65) and stops it [at the end](https://github.com/dotnet/aspnetcore/blob/867cec475d18892b828ac44a82d74eccfbbb0e49/src/Hosting/Hosting/src/Internal/HostingApplicationDiagnostics.cs#L162). Therefore, the \`first-api\` and \`second-api\` don't require this setup. However, the \`worker\` requires manual activity span creation since it's a message listener rather than an HTTP API.
  
  > **_NOTE:_** ASP.NET Core also sets the \`traceparent\` from the upstream request as [the current activity ParentId](https://github.com/dotnet/aspnetcore/blob/main/src/Hosting/Hosting/src/Internal/HostingApplicationDiagnostics.cs#L289).
  
  For the \`worker\` those packages are required:
  
  \`\`\` csharp
      <PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.0.0-rc7" />
      <PackageReference Include="OpenTelemetry.Exporter.Zipkin" Version="1.1.0" />
  \`\`\`
  
  OTel's dependency injection for the \`worker\` is configured in \`Program.cs\` as follows:
  
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
  
  Note that \`ActivitySource\` represents a [Tracer](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#tracer), used to start spans. As mentioned, the \`worker\` requires manual configuration of a new span scope for each message:
  
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
  
  The \`MessageHandler\` method is the queue listener, triggered when new messages arrive. A new span scope is created with \`StartActivity\`. The key is configuring this span scope to specify its upstream span. The \`_propagator\` variable is a \`TraceContextPropagator\`, an [opentelemetry-dotnet](https://github.com/open-telemetry/opentelemetry-dotnet/blob/main/src/OpenTelemetry.Api/Context/Propagation/TraceContextPropagator.cs) class serving as a text map propagator for W3C trace context. The crucial parameter of \`_propagator.Extract\` is the \`getter\` function, which OTel uses to extract propagation fields (\`traceparent\` and \`tracestate\`). Here's how \`ExtractTraceContextFromBasicProperties\` is configured:
  
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
  
  As shown, the \`worker\` expects \`traceparent\` and \`tracestate\` in the message header.
  
  ## Running the project
  
  In the [src folder](https://github.com/luizhlelis/dotnet-trace-context/tree/main/src), run this command to start all containers (\`first-api\`, \`second-api\`, \`worker\`, \`rabbit\`, and \`zipkin\`):
  
  \`\`\`bash
    docker-compose up
  \`\`\`
  
  Wait for all containers to start, then send a request to \`first-api\`:
  
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
  
  The message travels through the flow (\`first-api\` > \`second-api\` > \`rabbit\` > \`worker\`) with the propagation fields (\`traceparent\` and \`tracestate\`). Check the application stdout:
  
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
  
  Note that the \`trace-id\` (\`0a0578c18192c14bae738b777e072a42\`) remains constant throughout the trace, while the \`span-id\` (or \`parent-id\`) changes between applications (\`2db0e8c6b4654744\`, \`bfc08418aeb71a4e\`, and \`004468438f2d724c\`). To view the distributed tracing diagram, open Zipkin in your browser:
  
  \`\`\`bash
    http://localhost:9411/
  \`\`\`
  
  On the home page, leave the search field empty and click \`RUN QUERY\` to load all traces. Click on your trace to see a diagram like this:
  
  ![Zipkin Diagram](https://raw.githubusercontent.com/luizhlelis/dotnet-trace-context/main/doc/zipkin-diagram.webp)
  
  ## Conclusion
  
  The W3C Trace Context standard defines standards for distributed tracing propagation. Currently, only the HTTP standard is a \`W3C Recommendation\` (launched February 2020), while other standards (AMQP, MQTT, and baggage) remain in \`working draft\` status. This doesn't mean you should avoid using them in production, but be aware that specifications may change, so stay updated with newer releases.
  
  If you've made it this far and enjoyed the article, please let me know by reacting to this post. Feel free to open a discussion below—I'll respond as soon as possible. If you spot any errors, please open an issue in the [article's GitHub repo](https://github.com/luizhlelis/dotnet-trace-context). In the next article, I'll demonstrate a full distributed trace example in a microservice architecture using \`python\` with \`django\`. Hope you enjoy it!
  
  ## References
  
  DRUTU, Bogdan; KANZHELEV, Sergey; MCLEAN, Morgan; MOLNAR, Nik; REITBAUER, Alois; SHKURO, Yuri. [W3C Recommendation - Trace Context](https://www.w3.org/TR/trace-context/)
  
  KANZHELEV, Sergey; VASTERS, Clemens. [W3C Editor's draft - Trace Context: AMQP protocol](https://w3c.github.io/trace-context-amqp/)
  
  OPENTELEMETRY, Community. [OpenTelemetry .NET](https://github.com/open-telemetry/opentelemetry-dotnet)
  
  OPENTELEMETRY, Community. [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
  
  OPENTELEMETRY, Community. [OpenTelemetry Specification](https://github.com/open-telemetry/opentelemetry-specification)
  
  `,
  tracecontext: `
  # Using W3C Trace Context standard in distributed tracing

  During software development, when a system fails at runtime, developers naturally want to trace the failure back to its caller and the original request. This is where [stack trace](https://en.wikipedia.org/wiki/Stack_trace) helps. Here's an example:
  
  \`\`\` bash
  Unhandled exception. System.InvalidOperationException: Stack trace example
     at Program.CallChildActivity() in /Users/luizhlelis/Documents/projects/personal/trace-context-w3c/src/system-diagnostics-activity/Program.cs:line 22
     at Program.Main() in /Users/luizhlelis/Documents/projects/personal/trace-context-w3c/src/system-diagnostics-activity/Program.cs:line 11
  \`\`\`
  
  From this information, we can see that the failure occurred in the \`CallChildActivity()\` method (line 22), called by the \`Main()\` method (line 11), both in the \`Program.cs\` class. Runtime message tracking is essential for software health and reliability, such rich information greatly improves troubleshooting productivity. While stack traces work well for single-process applications like monolithic systems, they're insufficient for distributed systems like microservice architectures. This is why distributed tracing tools and standards became necessary. The W3C defines a standard for this called \`Trace Context\`.
  
  ## W3C Trace Context purpose
  
  Imagine a microservice architecture where two APIs communicate synchronously (via HTTP calls) and the second API communicates with a worker through a message broker:
  
  ### Figure 1 - Distributed trace
  
  ![distributed-trace](https://raw.githubusercontent.com/luizhlelis/trace-context-w3c/main/doc/distributed-trace.webp)
  
  Just like stack traces, every \`Activity\` needs an ID for identification and must know its caller's \`Activity\` ID. To solve this problem, vendors created tools that provide not only distributed trace information but also application performance metrics, load times, response times, and more. These vendors are called Application Performance Management (APM) tools or trace systems. Examples include:
  
  - Dynatrace
  - New Relic
  - Application Insights
  - Elastic APM
  - Zipkin
  
  > **_NOTE:_** I use the term \`vendor\` to describe trace systems because that's how the standard refers to them, though [this may change soon](https://github.com/w3c/trace-context/issues/387).
  
  Now imagine a scenario with many vendors and languages using different diagnostic libraries. Some identify traces with an \`operation-id\`, others use \`request-id\`, and still others use \`trace-id\`. Additionally, ID formats vary: some use \`hierarchical\` format, others use \`UUID\`, and some use 24-character \`string\` identifiers. This results in systems with different tracing vendors being unable to correlate or propagate traces due to the lack of a unique, forwarded identification. This is where the trace context standard becomes essential.
  
  ## The trace context standard
  
  The [W3C Trace Context](https://www.w3.org/TR/trace-context/) specification standardizes HTTP headers and formats for propagating distributed tracing context information. It defines two fields that propagate in HTTP request headers throughout the trace flow. Here's the standard definition of each field:
  
  - \`traceparent\`: Describes the incoming request's position in its trace graph. It provides a common format for the incoming request that all vendors understand.
  
  - \`tracestate\`: Extends traceparent with vendor-specific data as name/value pairs. Storing information in tracestate is optional.
  
  ## The \`traceparent\` field
  
  The \`traceparent\` field uses Augmented Backus-Naur Form (ABNF) notation from [RFC5234](https://www.w3.org/TR/trace-context/#bib-rfc5234) and consists of 4 sub-fields:
  
  \`version\` - \`traceid\` - \`parentid/spanid\` - \`traceflags\`
  
  > **_NOTE:_** The term \`sub-field\` is unofficial; I use it here for clarity.
  
  for example:
  
  \`\`\` bash
  00-480e22a2781fe54d992d878662248d94-b4b37b64bb3f6141-00
  \`\`\`
  
  - \`version\` (8-bit): The trace context version the system uses. Currently \`00\`.
  
  - \`trace-id\` (16-byte array): The ID of the entire trace, used to globally identify a distributed trace through a system.
  
  - \`parent-id\` / \`span-id\` (8-byte array): Identifies the parent of the current span on incoming requests or the current span on outgoing requests.
  
  - \`trace-flags\` (8-bit): Flags representing caller recommendations, related to three concerns: trust and abuse, caller bugs, or load differences between caller and callee services.
  
  > **_NOTE:_** All fields are encoded in \`hexadecimal\`.
  
  Applying the trace context concept to an application like Figure 1 produces this diagram:
  
  ### Figure 2 - Propagation fields
  
  ![propagation-fields](https://raw.githubusercontent.com/luizhlelis/trace-context-w3c/main/doc/w3c-trace-context.webp)
  
  Note that \`trace-id\` identifies the entire trace, while \`parent-id\` identifies a specific scope within it. Both \`traceparent\` and \`tracestate\` propagate throughout the trace flow.
  
  To better illustrate \`traceparent\` dynamics, here's a C# example where two span scopes are generated and context propagates through them:
  
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
  
  > **_NOTE:_** The \`System.Diagnostics.Activity\` library in .NET 5 already follows the W3C standard.
  
  Although this example shows a single-process application, it demonstrates the Trace Context standard pattern. The program first opens an upstream span scope and prints the \`traceparent\` to stdout, then calls a downstream method that opens another span scope, prints its \`traceparent\`, and closes the scope. Finally, the upstream span scope closes. Here's the output:
  
  \`\`\`bash
  Upstream
  traceparent: 00-3e425f2373d89640bde06e8285e7bf88-9a5fdefae3abb440-00
  
  Downstream Dependency
  traceparent: 00-3e425f2373d89640bde06e8285e7bf88-0767a6c6c1240f47-00
  \`\`\`
  
  Note that the \`trace-id\` (3e425f2373d89640bde06e8285e7bf88) remains constant throughout the trace, while the \`parent-id\` changes based on the span scope (upstream: 9a5fdefae3abb440, downstream: 0767a6c6c1240f47).
  
  The name \`parent-id\` might seem confusing, but it's based on the perspective of incoming requests. Think from the endpoint's perspective: when a message arrives at a controller, the \`traceparent\` in the header hasn't been updated by the middleware yet, so the ID represents the upstream ID or parent ID.
  
  A Working Draft document, [Trace Context Level 2](https://w3c.github.io/trace-context/), includes a response standard where \`parent-id\` becomes \`child-id\`.
  
  > **_NOTE:_** See the [W3C process](https://www.w3.org/2017/Process-20170301/#working-draft) for more information about how documents become W3C recommendations.
  
  ## The \`tracestate\` field
  
  The standard uses a fictional example to explain \`tracestate\`, which I'll reproduce here. Imagine a client and server using different trace vendors: Congo and Rojo. A client traced by Congo adds its vendor-specific ID to \`tracestate\`: \`tracestate: congo=t61rcWkgMzE\`. The outbound HTTP request then includes these headers:
  
  \`\`\`bash
  traceparent: 00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01
  
  tracestate: congo=t61rcWkgMzE
  \`\`\`
  
  Any other user-supplied information (non-vendor-specific) should go in the [baggage](https://w3c.github.io/baggage/) field, another standard currently in Working Draft status (not yet a W3C recommendation).
  
  ## Trace Context: AMQP protocol
  
  As shown in Figure 2, microservice architectures commonly propagate messages through brokers. For AMQP protocol operations, there's another specification: [Trace Context: AMQP protocol](https://w3c.github.io/trace-context-amqp/).
  
  The \`Trace Context: AMQP protocol\` is another Working Draft document. This standard specifies different trace context field placement in messages compared to the HTTP standard.
  
  The standard recommends that message publishers add \`traceparent\` and \`tracestate\` fields to the \`application-properties\` section. Message readers should build trace context by first checking \`message-annotations\` for these fields, then \`application-properties\` if not found. Here's the AMQP protocol message format:
  
  ### Figure 3 - AMQP message format
  
  ![amqp-message-format](https://raw.githubusercontent.com/luizhlelis/trace-context-w3c/main/doc/amqp-message-format.webp)
  
  This field placement exists because \`application-properties\` is defined by the message publisher and is immutable, brokers cannot modify it. In contrast, \`message-annotations\` is designed for broker usage and can be modified during message processing. If middleware needs to annotate messages as they flow, it must use the \`message-annotations\` section, based on the fields from \`application-properties\`.
  
  ## Conclusion
  
  The W3C Trace Context standard establishes patterns for distributed tracing. Currently, only the HTTP standard is a \`W3C Recommendation\` (launched February 2020); AMQP, MQTT, and baggage standards are still in development. While you can use these in production, be aware that specifications may change, so stay updated with new releases.
  
  If you enjoyed this article, please let me know by reacting to this post. Feel free to open a discussion below—I'll respond as soon as possible. If you spot any errors, please open an issue in the [article's GitHub repo](https://github.com/luizhlelis/trace-context-w3c). In the next article, I'll demonstrate a complete distributed trace example using trace context in a microservice architecture with \`.NET 5\`. Hope you enjoy it!
  
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

  If you're getting errors when pulling older .NET Docker images (like \`.NET 2.1\`), it's because Microsoft deleted them from Docker Hub on August 21st, 2021. This date coincides with \`.NET Core 2.1\` reaching end of support. For more details, see the official [dotnet announcement](https://github.com/dotnet/announcements/issues/197) or the [dotnet blog](https://devblogs.microsoft.com/dotnet/net-core-2-1-container-images-will-be-deleted-from-docker-hub/).
  
  In my case, I received this error when pulling the \`microsoft/dotnet:2.2-aspnetcore-runtime\` image:
  
  \`\`\`bash
  Error response from daemon: pull access denied for
  microsoft/dotnet, repository does not exist or may
  require 'docker login': denied: requested access to
  the resource is denied
  \`\`\`
  
  As mentioned, Microsoft moved \`out of support\` images from Docker Hub to the [Microsoft Container Registry](https://github.com/microsoft/containerregistry) (MCR). To fix this, I updated the image to \`mcr.microsoft.com/dotnet/core/runtime:2.2\`. Instead of pulling from Docker Hub (\`microsoft/dotnet\`), pull from MCR (\`mcr.microsoft.com\`):
  
  \`\`\`bash
  microsoft/dotnet:2.1-sdk -> mcr.microsoft.com/dotnet/sdk:2.1
  microsoft/dotnet:2.1-aspnetcore-runtime -> mcr.microsoft.com/dotnet/aspnet:2.1
  microsoft/dotnet:2.1-runtime -> mcr.microsoft.com/dotnet/runtime:2.1
  microsoft/dotnet:2.1-runtime-deps -> mcr.microsoft.com/dotnet/runtime-deps:2.1
  \`\`\`
  
  > **NOTE**: See the complete Docker Hub to MCR image mapping [here](https://devblogs.microsoft.com/dotnet/net-core-2-1-container-images-will-be-deleted-from-docker-hub/#pulling-images-from-mcr)
  
  You might wonder why Microsoft announced removing 2.1 images but not 2.2 images. The answer is simple: \`.NET 2.2\` was deprecated on December 23, 2019, so Microsoft didn't need to announce it since they no longer support it. 🤷‍♂️
  
  > **NOTE**: It's strongly recommended to upgrade to later \`.NET\` versions rather than using unsupported versions like 2.1 or 2.2
  `,
  typesense: `
  # ⚡ 🔍 Typesense search engine: an easier-to-use alternative to ElasticSearch
  
  In daily development, it's common to need to search for specific terms in large datasets. Search engine tools solve this problem, with [ElasticSearch](https://github.com/elastic/elasticsearch) being one of the most popular. If you've worked with ElasticSearch, you know it's powerful but also complex with a steep learning curve. An in-house ElasticSearch deployment involves high operational overhead, with over 3000 configuration parameters to manage.
  
  Built in C++, [Typesense](https://github.com/typesense/typesense) offers an easier alternative to ElasticSearch. The community describes it as open-source, fast, typo-tolerant, and easy to use. This article provides a quick introduction to Typesense using a Nobel Prize Winners search engine example.
  
  ## Server configuration
  
  Like most search engines, Typesense is a NoSQL document-oriented database. For this example, I'll self-host Typesense locally using the official [Docker image](https://hub.docker.com/r/typesense/typesense/), as shown in the [source code](https://github.com/luizhlelis/typesense-playground). Typesense requires [few configuration parameters](https://typesense.org/docs/0.21.0/api/server-configuration.html#using-command-line-arguments). You can use default values and just configure \`--api-key\` (admin API key for all operations) and \`--data-dir\` (directory path for disk storage). Here's the docker-compose configuration:
  
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
  
  > **NOTE**: When using environment variables, add the \`TYPESENSE_\` prefix to variable names
  
  Note that I created a volume for the \`typesense-data\` folder to persist container data locally. Along with the \`typesense\` service, I added a \`seed-data\` service in \`docker-compose.yml\` to seed Nobel Prize Winners data into Typesense:
  
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
  
  The volumes include paths to scripts ([wait-for-it.sh](https://github.com/luizhlelis/typesense-playground/blob/main/src/scripts/wait-for-it.sh) waits for Typesense to respond on its port, and [batch-import-docs.sh](https://github.com/luizhlelis/typesense-playground/blob/main/src/scripts/batch-import-docs.sh) seeds the data) and the dataset formatted as [JSONLines](https://jsonlines.org/).
  
  ## Create collection and import documents
  
  Before importing documents, you must create a \`collection\`. In Typesense, a \`collection\` is a group of related documents, and a \`schema\` defines the fields in those documents. Think of a \`schema\` like types in a strongly-typed programming language. Remember: all fields in a collection's schema are indexed in memory. Here's the \`prizes\` collection for this example:
  
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
  
  > **NOTE**: Indexes improve query performance. When an appropriate index exists, Typesense uses it to limit the documents it needs to inspect
  
  The schema has four indexed fields: \`id\`, \`year\`, \`category\`, and \`laureates_full_name\`. The [dataset](https://github.com/luizhlelis/typesense-playground/blob/main/src/seed-data/documents.jsonl) contains additional fields like \`laureates.motivation\`, \`laureates.share\`, and \`laureates.surname\`. These extra fields are stored on disk but don't consume memory.
  
  For the dataset import, I'm using the [import API](https://typesense.org/docs/0.21.0/api/documents.html#import-documents) to index multiple documents in a batch:
  
  \`\`\`bash
  curl -H "X-TYPESENSE-API-KEY: \${TYPESENSE_API_KEY}" -X POST --data-binary @../seed-data/documents.jsonl \
  "http://\${SERVER_HOSTNAME}:8108/collections/prizes/documents/import?action=create"
  \`\`\`
  
  Now that you understand the setup, run this command to start the Typesense server and seed the data:
  
  \`\`\`bash
  docker-compose up --build
  \`\`\`
  
  ## Searching for the Nobel Prize Winners
  
  With the Typesense server running, let's search for Nobel Prize winners. First, export the \`TYPESENSE_API_KEY\` environment variable for local client use:
  
  \`\`\`bash
  export TYPESENSE_API_KEY=Hu52dwsas2AdxdE
  \`\`\`
  
  Then use the [search API](https://typesense.org/docs/0.21.0/api/documents.html#search) to search documents. For example, to search for Marie Curie's prizes, run this command locally:
  
  \`\`\`bash
  curl -H "X-TYPESENSE-API-KEY: \${TYPESENSE_API_KEY}" \
  "http://localhost:8108/collections/prizes/documents/search\
  ?q=Curii&query_by=laureates_full_name\
  &sort_by=year:desc"
  \`\`\`
  
  Notice the typo? The query uses \`Curii\` instead of \`Curie\`. Typesense handles typographic errors seamlessly. Here are the returned documents (response truncated for brevity):
  
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
  
  Typesense is becoming a strong alternative to search engines like Algolia and ElasticSearch. Its simple server setup and intuitive API make it much easier to use. While I used CURL in this example to interact with Typesense directly, many [clients and integrations](https://github.com/typesense/typesense#api-clients) are available in various programming languages.
  
  I'd love to hear your thoughts! If you're using Typesense in production, [let the community know](https://github.com/typesense/typesense/issues/140)! If you enjoyed this article, please react to this post. Feel free to open a discussion below—I'll respond as soon as possible. If you spot any errors, please open an issue in the [article's GitHub repo](https://github.com/luizhlelis/typesense-playground).
  
  `,
};
export default dict;

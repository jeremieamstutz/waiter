export default {
	// This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.
	continue: 100,
	// This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching too.
	switchingProtocols: 101,
	// This code indicates that the server has received and is processing the request, but no response is available yet.
	processing: 102,
	// The request has succeeded. The meaning of a success varies depending on the HTTP method:
	//  * GET: The resource has been fetched and is transmitted in the message body.
	//  * HEAD: The entity headers are in the message body.
	//  * POST: The resource describing the result of the action is transmitted in the message body.
	//  * TRACE: The message body contains the request message as received by the server
	ok: 200,
	// The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a PUT request.
	created: 201,
	// The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.
	accepted: 202,
	//  This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.
	nonAuthoritativeInformation: 203,
	// There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.
	noContent: 204,
	// This response code is sent after accomplishing request to tell user agent reset document view which sent this request.
	resetContent: 205,
	// This response code is used because of range header sent by the client to separate download into multiple streams.
	partialContent: 206,
	// A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.
	multiStatus: 207,
	// The request has more than one possible responses. User-agent or user should choose one of them. There is no standardized way to choose one of the responses.
	multipleChoices: 300,
	// This response code means that URI of requested resource has been changed. Probably, new URI would be given in the response.
	movedPermanently: 301,
	// This response code means that URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.
	movedTemporarly: 302,
	// Server sent this response to directing client to get requested resource to another URI with an GET request.
	seeOther: 303,
	// This is used for caching purposes. It is telling to client that response has not been modified. So, client can continue to use same cached version of response.
	notModified: 304,
	// Server sent this response to directing client to get requested resource to another URI with same method that used prior request. This has the same semantic than the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
	temporaryRedirect: 307,
	// This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
	permanentRedirect: 308,
	// This response means that server could not understand the request due to invalid syntax.
	badRequest: 400,
	// Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
	unauthorized: 401,
	// This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.
	paymentRequired: 402,
	// The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client's identity is known to the server.
	forbidden: 403,
	// The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurence on the web.
	notFound: 404,
	// The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.
	methodNotAllowed: 405,
	// This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.
	notAcceptable: 406,
	// This is similar to 401 but authentication is needed to be done by a proxy.
	proxyAuthenticationRequired: 407,
	// This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.
	requestTimeout: 408,
	// This response is sent when a request conflicts with the current state of the server.
	conflict: 409,
	// This response would be sent when the requested content has been permenantly deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.
	gone: 410,
	// The server rejected the request because the Content-Length header field is not defined and the server requires it.
	lengthRequired: 411,
	// The client has indicated preconditions in its headers which the server does not meet.
	preconditionFailed: 412,
	// Request entity is larger than limits defined by server; the server might close the connection or return an Retry-After header field.
	requestTooLong: 413,
	// The URI requested by the client is longer than the server is willing to interpret.
	requestUriTooLong: 413,
	// The media format of the requested data is not supported by the server, so the server is rejecting the request.
	unsupportedMediaType: 415,
	// The range specified by the Range header field in the request can't be fulfilled; it's possible that the range is outside the size of the target URI's data.
	requestedRangeNotSatisfiable: 416,
	// This response code means the expectation indicated by the Expect request header field can't be met by the server.
	expectationFailed: 417,
	// Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.
	imATeapot: 418,
	// The insufficient storage status code means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. This condition is considered to be temporary. If the request which received this status code was the result of a user action, the request MUST NOT be repeated until it is requested by a separate user action.
	insufficientSpaceOnResource: 419,
	// The request was well-formed but was unable to be followed due to semantic errors.
	unprocessableEntity: 422,
	// The resource that is being accessed is locked.
	locked: 423,
	// The request failed due to failure of a previous request.
	failedDependency: 424,
	// The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.
	preconditionRequired: 428,
	// The user has sent too many requests in a given amount of time ("rate limiting").
	tooManyRequests: 429,
	// The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.
	requestHeaderFieldsTooLarge: 431,
	// The user-agent requested a resource that cannot legally be provided, such as a web page censored by a government.
	unavailableForLegalReasons: 451,
	// The server encountered an unexpected condition that prevented it from fulfilling the request.
	internalServerError: 500,
	// The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
	notImplemented: 501,
	// This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
	badGateway: 502,
	// The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This responses should be used for temporary conditions and the Retry-After: HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.
	serviceUnavailable: 503,
	// This error response is given when the server is acting as a gateway and cannot get a response in time.
	gatewayTimeout: 504,
	// The HTTP version used in the request is not supported by the server.
	httpVersionNotSupported: 505,
	// The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
	insufficientStorage: 507,
	// The 511 status code indicates that the client needs to authenticate to gain network access.
	networkAuthenticationRequired: 511,
}

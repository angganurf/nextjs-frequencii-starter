import { createSwaggerSpec } from "next-swagger-doc";

export async function GET() {
	const spec = createSwaggerSpec({
		apiFolder: "src/app/api", // Define where your API routes are
		definition: {
			openapi: "3.0.0",
			info: {
				title: "Editin Foto API",
				version: "1.0",
				description: "External API for Editin Foto platform",
			},
			components: {
				securitySchemes: {
					ApiKeyAuth: {
						type: "apiKey",
						in: "header",
						name: "X-API-KEY",
					},
				},
			},
			security: [
				{
					ApiKeyAuth: [],
				},
			],
		},
	});
	return Response.json(spec);
}

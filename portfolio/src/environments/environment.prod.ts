export const environment = {
    production: true,
    apiUri: "",
    s3AssetUrl: "",
    emailServiceData: {
        templateId: parseInt(process.env["EMAIL_TEMPLATE_ID"] || "2"),
        apiUrl: process.env["EMAIL_API_URL"] || "",
        apiKey: process.env["EMAIL_API_KEY"] || "",
    },
    socialMediaUrls: {
        linkedIn: process.env["LINKEDIN"] || "",
        gitHub: process.env["GITHUB"] || "",
        instagram: process.env["INSTAGRAM"] || "",
        youtube: process.env["YOUTUBE"] || ""
    }
};
export const environment = {
    production: false,
    apiUri: "",
    s3AssetUrl: "",
    emailServiceData: {
        templateId: process.env["EMAIL_TEMPLATE_ID"],
        apiUrl: process.env["EMAIL_API_URL"],
        apiKey: process.env["EMAIL_API_KEY"],
    },
    socialMediaUrls: {
        linkedIn: process.env["LINKEDIN"],
        gitHub: process.env["GITHUB"],
        instagram: process.env["INSTAGRAM"],
        youtube: process.env["YOUTUBE"]
    }
};
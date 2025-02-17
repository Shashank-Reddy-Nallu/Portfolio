const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Define the path to environment.ts
const envFilePath = path.join(__dirname, 'src/environments/environment.prod.ts');

// Generate environment.ts content
const envConfig = `export const environment = {
    production: true,
    apiUri: "",
    s3AssetUrl: "",
    emailServiceData: {
        templateId: ${parseInt(process.env.EMAIL_TEMPLATE_ID || '1')},
        apiUrl: '${process.env.EMAIL_API_URL || 'DEFAULT_API_URL'}',
        apiKey: '${process.env.EMAIL_API_KEY || 'DEFAULT_API_KEY'}',
    },
    socialMediaUrls: {
        linkedIn: '${process.env.LINKEDIN || 'DEFAULT_URL'}',
        gitHub: '${process.env.GITHUB || 'DEFAULT_URL'}',
        instagram: '${process.env.INSTAGRAM || 'DEFAULT_URL'}',
        youtube: '${process.env.YOUTUBE || 'DEFAULT_URL'}'
    }
};`;

// Write to environment.ts
fs.writeFileSync(envFilePath, envConfig, { encoding: 'utf8' });

console.log(`Environment file generated successfully.`);
const mongoose = require("mongoose");
const mongodb = require("mongodb");

// const URL = "mongodb://127.0.0.1:27017/TaskLoginDB";
const URL = process.env.MONGODB_URI;


const connectDB = async ()=>{
    try {
        await mongoose.connect(URL);
        console.log("Connection successful to DB");
    } catch (error) {
        console.error("Database connection failed ");
        process.exit(0);
    }
}




module.exports=connectDB;


//  [
//     {
//       "service_name": "Graphic Design",
//       "description": "Professional graphic design services for logos, branding, and marketing materials.",
//       "price": "$50 per hour",
//       "provider_name": "Creative Designs Inc.",
//       "image_link": "https://thumbs.dreamstime.com/b/digital-transformation-technology-strategy-ideas-adoption-business-age-enhancing-global-capabilities-215266548.jpg"
//     },
//     {
//       "service_name": "Web Development",
//       "description": "Custom website development tailored to your business needs, from simple landing pages to complex web applications.",
//       "price": "$1000 starting price",
//       "provider_name": "Web Wizards LLC",
//       "image_link": "https://c8.alamy.com/comp/WXCTBX/creative-arrangement-of-various-technology-related-elements-as-a-concept-metaphor-on-subject-of-industry-science-and-education-WXCTBX.jpg"
//     },
//     {
//       "service_name": "Photography",
//       "description": "Professional photography services for events, portraits, and commercial projects.",
//       "price": "$200 per session",
//       "provider_name": "Captured Moments Photography",
//       "image_link": "https://www.shutterstock.com/shutterstock/photos/1932042689/display_1500/stock-photo-businessman-using-mobile-smart-phone-business-global-internet-connection-application-technology-1932042689.jpg"
//     },
//     {
//       "service_name": "Content Writing",
//       "description": "Engaging and SEO-friendly content writing services for websites, blogs, and marketing campaigns.",
//       "price": "$0.10 per word",
//       "provider_name": "Write Right Agency",
//       "image_link": "https://thumbs.dreamstime.com/z/businessman-phone-earth-globe-stock-market-dynamics-using-smartphone-hand-diagrams-hologram-sphere-colorful-chart-245934068.jpg"
//     },
//     {
//       "service_name": "Social Media Management",
//       "description": "Strategic social media management services to increase brand awareness, engagement, and followers.",
//       "price": "$500 per month",
//       "provider_name": "Social Buzz Inc.",
//       "image_link": "https://www.omniaccounts.co.za/wp-content/uploads/2021/12/How-Do-I-Keep-Track-of-Sales-Quotes-min.jpg"
//     },
//     {
//       "service_name": "Mobile App Development",
//       "description": "Custom mobile app development for iOS and Android platforms, from idea to launch.",
//       "price": "$5000 starting price",
//       "provider_name": "App Innovators LLC",
//       "image_link": "https://www.shutterstock.com/image-vector/office-work-discussion-team-four-260nw-2337717139.jpg"
//     },
//     {
//       "service_name": "SEO Consulting",
//       "description": "Expert SEO consulting services to improve search engine rankings and drive organic traffic to your website.",
//       "price": "$100 per hour",
//       "provider_name": "SEO Masters Agency",
//       "image_link": "https://cdn2.vectorstock.com/i/1000x1000/05/46/science-related-icons-image-vector-10800546.jpg"
//     }
//   ]

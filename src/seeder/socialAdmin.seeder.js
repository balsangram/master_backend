import { AdminUSer } from "../modules/admin/admin.model.js";

async function checkAdmin() {
    try {
        const existingAdmin = await AdminUSer.findOne({
            email: "admin@gmail.com",
            userType: "admin",
        });

        if (!existingAdmin) {
            await AdminUser.create({
                name: "Admin",
                email: "admin@gmail.com",
                password: "1234",
                userType: "admin",
            });
            console.log("✅ Admin seeded successfully: admin@gmail.com");
        } else {
            console.log("ℹ️ Admin already exists: admin@gmail.com");
        }
    } catch (error) {
        console.error("❌ MongoDB operation failed:", error);
    }
}

export { checkAdmin };

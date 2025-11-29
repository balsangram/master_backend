import { AdminAuth } from "../modules/admin/model/admin.model.js";

async function checkAdmin() {
    try {
        const existingAdmin = await AdminAuth.findOne({ email: "admin@gmail.com" });

        if (!existingAdmin) {
            await AdminAuth.create({
                userName: "admin",
                name: "Admin",
                email: "admin@gmail.com",
                phone: "6370404471",
                password: "123456", // will be hashed by pre-save hook
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

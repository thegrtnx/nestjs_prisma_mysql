// Import necessary modules
import { PrismaService } from '../prisma/prisma.service';
import { AdminUtil } from '../util/admin.util';

const prismaService = new PrismaService();

const adminUtil = new AdminUtil(prismaService);

const defaultAdminDetails = {
  name: 'Ahmed Olawale',
  email: 'admin.omega@gmail.com',
  password: 'admin',
};

const createAdmin = async () => {
  try {
    await adminUtil.createAdminUser(defaultAdminDetails.name, defaultAdminDetails.email, defaultAdminDetails.password);
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prismaService.$disconnect();
  }
};

createAdmin();

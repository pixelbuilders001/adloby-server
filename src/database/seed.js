import connectDB from './connection.js';
import User from '../models/user.model.js';

async function seed() {
  await connectDB();
  await User.deleteMany({ email: 'admin@example.com' });
  await User.create({ name: 'Admin', email: 'admin@example.com', password: 'Admin@12345', role: 'admin' });
  console.log('Seed completed: admin@example.com / Admin@12345');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

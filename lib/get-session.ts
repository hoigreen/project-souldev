import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/options';

const getSession = async () => getServerSession(authOptions);

export default getSession;

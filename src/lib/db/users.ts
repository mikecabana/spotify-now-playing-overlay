import { prisma } from './db';

export const getUserByEmail = async (email: string) => {
    return await prisma.users.findFirst({ where: { email } });
};

export const createUser = async (data: { email: string; at: string; rt: string; exp: number }) => {
    return await prisma.users.create({ data });
};

export const updateUser = async (email: string, data: { at: string; rt: string; exp: number }) => {
    return await prisma.users.update({ data, where: { email } });
};

import { NextResponse } from 'next/server'
import prisma from '../../../../prisma/client'

    export async function POST(req) {
        const { name, content,background } = await req.json()
        const confession = await prisma.confession.create({
            data: {
            name:name,
            content:content,
            background:background
            },
        })
        return NextResponse.json({
            succes:true,
            message:"data posted",
            data:confession},{status:201})
    }

        export async function GET() {
            const confession = await prisma.confession.findMany()
            return NextResponse.json({
                succes:true,
                message:"seluruh data confess",
                data:confession},{status:200})
        }
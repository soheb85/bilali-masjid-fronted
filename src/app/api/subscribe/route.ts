import { NextResponse } from 'next/server';
import Subscriber from '@/models/Subscriber';
import { connectDB } from '@/lib/mongoose';


export async function POST(req:Request) {
  await connectDB();
  const { endpoint, keys } = await req.json();

  try {
    const existingSub = await Subscriber.findOne({ endpoint });
    if (!existingSub) {
      await Subscriber.create({ endpoint, keys });
    }
    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 });
  } catch (errors) {
    return NextResponse.json({ error: 'Failed to subscribe',errors }, { status: 500 });
  }
}



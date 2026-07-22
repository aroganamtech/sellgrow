import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { status: 'error', message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Generate a 6-digit numeric OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Return the generated OTP to display on the page for demo/verification
    return NextResponse.json({
      status: 'success',
      message: `OTP sent successfully to ${email}.`,
      otp: generatedOtp, // Displayed on page for easy testing
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message || 'Failed to send OTP.' },
      { status: 500 }
    );
  }
}

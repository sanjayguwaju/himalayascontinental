// src/app/api/track/route.ts  (Next.js App Router)
import { NextRequest, NextResponse } from "next/server";
import payload from "payload";

export async function GET(req: NextRequest) {
  const trackingCode = req.nextUrl.searchParams.get("code");

  if (!trackingCode) {
    return NextResponse.json({ error: "Tracking code is required" }, { status: 400 });
  }

  try {
    const result = await payload.find({
      collection: "suchi-darta",
      where: { trackingCode: { equals: trackingCode.toUpperCase() } },
      // Only expose these fields publicly — never expose internal notes
      select: {
        trackingCode: true,
        applicantName: true,
        submittedDate: true,
        approvalStatus: true,
        remarks: true,
        rejectionReason: true,
        additionalInfoRequested: true,
        approvalCertificateNumber: true,
        approvalValidUntil: true,
        reviewedDate: true,
      },
      overrideAccess: true, // bypass access control for public tracking
    });

    if (!result.docs.length) {
      return NextResponse.json(
        { error: "No application found with this tracking code" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: result.docs[0] });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

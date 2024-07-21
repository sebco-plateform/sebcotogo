
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";  
import { CharacteristicModel } from "@/models/characteristicModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const characteristicModel: CharacteristicModel = body;

        const dataValidation = Dto.characteristicDto().validate(characteristicModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const characteristic = await prismadb.characteristic.create({ data: dataValidation.value });
            return NextResponse.json({characteristic: characteristic, ok: true});
        }

    } catch (error) {
        console.error('[characteristic]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const characteristic = await prismadb.characteristic.findMany({
            
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(characteristic);
    } catch (error) {
        console.error('[characteristic]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}
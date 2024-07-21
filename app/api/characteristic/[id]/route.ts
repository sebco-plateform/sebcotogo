
import {Dto} from "@/DTO/Dto";
import { CharacteristicModel } from "@/models/characteristicModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const characteristicModel: CharacteristicModel = body;

     

        const dataValidate = Dto.categoryDto().validate(characteristicModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const characteristic = await prismadb.characteristic.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({characteristic: characteristic, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[characteristic]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const characteristic = await prismadb.characteristic.delete({
            where: { id: id }
        });

        return NextResponse.json({characteristic: characteristic, status: 200, ok:true });
    } catch (error) {
        console.error('[characteristic]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const characteristic = await prismadb.characteristic.findUnique({
            where: { id }
        });

        return NextResponse.json(characteristic);
    } catch (error) {
        console.error('[characteristic]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}
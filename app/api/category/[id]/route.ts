
import {Dto} from "@/DTO/Dto";
import { CategoryModel } from "@/models/CategoryModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const categoryModel: CategoryModel = body;

     

        const dataValidate = Dto.categoryDto().validate(categoryModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const productCategory = await prismadb.productCategory.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({productCategory: productCategory, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[productCategory]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const productCategory = await prismadb.productCategory.delete({
            where: { id: id }
        });

        return NextResponse.json({productCategory: productCategory, status: 200, ok:true });
    } catch (error) {
        console.error('[productCategory]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const productCategory = await prismadb.productCategory.findUnique({
            where: { id }
        });

        return NextResponse.json(productCategory);
    } catch (error) {
        console.error('[productCategory]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}
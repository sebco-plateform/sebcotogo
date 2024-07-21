import {Dto} from "@/DTO/Dto";
import { ArticleModel } from "@/models/ArticleModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const articleModel: ArticleModel = body;


        const dataValidate = Dto.productDto().validate(articleModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const product = await prismadb.product.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({product: product, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[productCategory]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const product = await prismadb.product.delete({
            where: { id: id }
        });

        return NextResponse.json({product: product, status: 200, ok:true });
    } catch (error) {
        console.error('[product]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const product = await prismadb.product.findUnique({
            where: { id }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('[product]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}
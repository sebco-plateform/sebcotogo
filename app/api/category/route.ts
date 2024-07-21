
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";                   
import { CategoryModel } from "@/models/CategoryModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const categoryModel: CategoryModel = body;

        const dataValidation = Dto.categoryDto().validate(categoryModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const productCategory = await prismadb.productCategory.create({ data: dataValidation.value });
            return NextResponse.json({productCategory: productCategory, ok: true});
        }

    } catch (error) {
        console.error('[productCategory_post]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const productCategory = await prismadb.productCategory.findMany({
            
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(productCategory);
    } catch (error) {
        console.error('[productCategory]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import { ArticleModel } from "@/models/ArticleModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const articleModel: ArticleModel = body;

        const dataValidation = Dto.productDto().validate(articleModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const product = await prismadb.product.create({ data: dataValidation.value });
            return NextResponse.json({product: product, ok: true});
        }

    } catch (error) {
        console.error('[productCategory_post]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const product = await prismadb.product.findMany({
            
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(product);
    } catch (error) {
        console.error('[product]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}

import {Api} from "@/api/Api";
import {DataInterface} from "@/lib/interfaces";
import {Resend} from "resend";

class Resources {

    static formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Notez l'ajout de 1, car les mois sont indexés à partir de zéro
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    static currentDate = new Date();
    static date = Resources.formatDate(Resources.currentDate);

    static async fetchArticles(catId: string) {
        try {
            const articles: any[] = await Api.getAll(`article/articleByCategoryId/${catId}`);
            const dataArray: DataInterface[] = [];

            for (const articleElement of articles) {
                const imgData: any[] = await Api.getAll(`image/articleImage/${articleElement.article_id}`);
                const relevantImages = imgData.filter(img => img.article.id == articleElement.article_id);

                relevantImages.forEach(img => {
                    dataArray.push({
                        name: articleElement.article_articleName,
                        price: String(articleElement.article_price),
                        description: articleElement.article_description,
                        articleId: String(articleElement.article_id),
                        imageUrl: img.imageUrl,
                        imageId: String(img.id)
                    });
                });
            }

            return dataArray;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }



}


export const resend = new Resend('re_CWcnuVwV_C7GCM4bG7xHazmFgtVPKaXRj');

export default Resources;

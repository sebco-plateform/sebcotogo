export class Api {
    static url = "http://localhost:3001/"; // process.env.API_URL!;

    static async  post(data: any, endPoint: string) {
        const response = await fetch(`${Api.url}${endPoint}`, {
            //mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response ;
    }


    static async  getAll(endPoint: string): Promise<[]> {
        const url = `${Api.url}${endPoint}`;
        try {
            const res = await fetch(url, {
                // mode: 'no-cors',
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                }
            });
            if(!res.ok) {
                throw new Error("la reponse du réseau n'est pas OK");
            }

            //const data = await res.json();
            return await res.json();
        } catch(errors) {
            console.log(`erreur de recuperation de donné ${errors}`);
            throw errors;
        }
    }

    static async remove(endPoint: string) {
        const res = await fetch(`${Api.url}${endPoint}`,

            {
                // mode: 'no-cors',
                method: 'DELETE',
            });
        return res;
    }


    static async  update(data: any, endPoint: string) {
        const response = await fetch(`${Api.url}`,
         {
            //gitit mode: 'no-cors',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response ;
    }

}

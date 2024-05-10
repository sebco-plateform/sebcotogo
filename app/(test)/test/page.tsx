"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
const Test = () => {


    return (
        <div className={'flex '}>
            <Tabs activationMode={"manual"} defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    valuer acount
                </TabsContent>
                <TabsContent value="password">
                   value password
                </TabsContent>
            </Tabs>

        </div>
    );
}

export default Test;
"use client"

import { Button } from "@/components/ui/button"
import { useApiMutation } from "@/hooks/use-api-mutation"
import Link from "next/link"

const page = () => {
    const { mutate: updateSetting, isPending } = useApiMutation({
        url: "/sales/commission/manager/settings/subscription",
        method: "PUT", invalidateKeys: [["/sales/commission/lines"]]
    })
    return (
        <div>
            <Button size="lg" variant="outline" onClick={() => {
                updateSetting({
                    "percentage": 19,
                    "duration_months": 10
                })
            }}>Refetch Test</Button>
             <Link href="/manager">User</Link>
        </div>
    )
}

export default page

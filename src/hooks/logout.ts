import { tokenService } from '@/services/tokenService'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const useLogout = () => {
    const navigate = useRouter()
    const logout = async () => {
        try {
            const res = await axios.post("/api/logout")
            if (res?.status === 200) {
                toast.success(res?.data?.message)
                tokenService.remove()
                navigate.replace("/login")
            }
        } catch {
            toast.error("Something went wrong unable to logout")
        }
    }
    return logout
}

export default useLogout

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div className="flex items-center">
                <img src="/logo.jpg" alt="JobSpot Logo" className="mr-2 h-10 w-auto" />
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Spot</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5 '>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="relative inline-block text-gray-500 before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-green-500 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 after:absolute after:top-0 after:left-0 after:w-full after:h-[2px] after:bg-green-500 after:origin-right after:scale-x-0 after:transition-transform after:duration-300 hover:before:scale-x-100 hover:after:scale-x-100">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="relative inline-block text-gray-500 before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-green-500 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 after:absolute after:top-0 after:left-0 after:w-full after:h-[2px] after:bg-green-500 after:origin-right after:scale-x-0 after:transition-transform after:duration-300 hover:before:scale-x-100 hover:after:scale-x-100">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="relative inline-block text-gray-500 before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-green-500 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 after:absolute after:top-0 after:left-0 after:w-full after:h-[2px] after:bg-green-500 after:origin-right after:scale-x-0 after:transition-transform after:duration-300 hover:before:scale-x-100 hover:after:scale-x-100">Home</Link></li>
                                    <li><Link to="/jobs" className="relative inline-block text-gray-500 before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-green-500 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 after:absolute after:top-0 after:left-0 after:w-full after:h-[2px] after:bg-green-500 after:origin-right after:scale-x-0 after:transition-transform after:duration-300 hover:before:scale-x-100 hover:after:scale-x-100">Jobs</Link></li>
                                    <li><Link to="/browse" className="relative inline-block text-gray-500 before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-green-500 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 after:absolute after:top-0 after:left-0 after:w-full after:h-[2px] after:bg-green-500 after:origin-right after:scale-x-0 after:transition-transform after:duration-300 hover:before:scale-x-100 hover:after:scale-x-100">Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar
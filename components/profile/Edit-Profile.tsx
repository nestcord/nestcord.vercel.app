"use client";
import { useState} from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import Image from "next/image";
import { Button } from "../ui/button";
  
export default function EditProfile() {

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                Edit Profile
                </Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-[400px] p-4">
                <DialogHeader>
                    <DialogTitle className="sr-only">Edit Profile</DialogTitle>
                    <DialogDescription className="sr-only">Edit your profile details.</DialogDescription>
                </DialogHeader>

                <div className="relative h-40">
                    <Image
                        src={"/assets/default-profile-banner.webp"}
                        alt="Profile Banner"
                        layout="fill"
                        className="rounded-t-lg" />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
import { fetchProfile } from "@/components/actions/Fetch-Profile";
import Sidebar from "@/components/navigation/Sidebar";

import { Profile } from "@/components/profile/Profile";
import { ProfilePosts } from "@/components/profile/Profile-Posts";

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await fetchProfile(id);

    return (
        <section className="flex w-full max-w-6xl mx-auto gap-0">
            <Sidebar />

                <div className="flex-1 px-4">
                    <Profile {...user} />

                    <ProfilePosts id={user.id} />     
                </div>   
        </section>
    )
}


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await fetchProfile(id);
  
    return {
      title: `@${user.username} | Nestcord`,
      description: `@${user.username} | ${user.biography}`,
    };
  }
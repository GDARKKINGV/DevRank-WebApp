import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfileRequest } from "@/api/profile";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function DevProfilePage() {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const { toast } = useToast();
  const { userId } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfileRequest(userId);
        setProfile(res.data);
        setProfileImage(res.data.profileImage.url);
      } catch (error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
      }
    };

    fetchProfile();
  }, [userId]);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-8 my-10">
        <Card className="flex items-center gap-4 px-4 py-6 md:px-6 md:py-8 m-6">
          <Avatar className="h-20 w-20 md:h-28 md:w-28">
            <AvatarImage src={profileImage} />
            <AvatarFallback>
              {profile?.name[0]}
              {profile?.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div className="grid gap-1 flex-1">
            <h1 className="text-xl font-bold md:text-2xl">
              {profile?.name + " " + profile?.lastName}
            </h1>
            <p className="text-sm">@{profile?.userName}</p>

            <div className="flex items-center gap-2">
              <span className="icon-[mdi--star]"></span>
              {profile?.points}
            </div>
          </div>
        </Card>

        <div className="grid gap-8 px-4 md:px-6 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-8">
            {profile?.about && (
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="w-full break-words">
                    <p>{profile?.about}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {profile?.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-md"
                      >
                        {skill.skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {profile?.socialLinks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profile.socialLinks.map((link, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-md"
                      >
                        <Link to={link.url} target="_blank">
                          {link.plataform}
                        </Link>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-8">
            {profile?.experience.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-12">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="grid gap-2 bg-outline">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{exp.position}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(exp.startDate)} -{" "}
                          {exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {exp.company}
                      </p>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {profile?.education.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-12">
                  {profile?.education.map((edu, index) => (
                    <div key={index} className="grid gap-2 bg-outline">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{edu.degree}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(edu.startDate)} -{" "}
                          {edu.endDate ? formatDate(edu.endDate) : "Present"}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {edu.school}
                      </p>
                      <p className="text-sm">{edu.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import DinamicDialogForm from "@/components/DinamicDialogForm";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user, updateProfile, errors } = useAuth();
  const { toast } = useToast();
  const [localUser, setLocalUser] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [sendData, setSendData] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    setLocalUser({ ...user });
    setProfileImage(user.profileImage.url);
  }, [user]);

  const onSubmit = (field, data) => {
    if (field === "") {
      setLocalUser({ ...localUser, ...Object.fromEntries(data.entries()) });
      setSendData(Object.fromEntries(data.entries()));
      if (data.get("profileImage")) {
        setProfileImage(URL.createObjectURL(data.get("profileImage")));
      }
    } else {
      setLocalUser({
        ...localUser,
        [field]: [...localUser[field], Object.fromEntries(data.entries())],
      });
      setSendData({
        [field]: [...localUser[field], Object.fromEntries(data.entries())],
      });
    }
    setIsEditing(true);
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("data", JSON.stringify(sendData));

    if (sendData.profileImage) {
      formData.append("profileImage", sendData.profileImage);
    }

    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast({
        description: "Profile updated successfully!",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    }
  };

  const handleDeleteSkill = (index) => {
    const newSkills = [...localUser.skills];
    newSkills.splice(index, 1);
    setLocalUser({ ...localUser, skills: newSkills });
    setSendData({ skills: newSkills });
    setIsEditing(true);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  useEffect(() => {
    errors.forEach((error) => {
      toast({
        variant: "destructive",
        description: error,
      });
    });
  }, [errors]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-8 my-10">
        <Card className="flex items-center gap-4 px-4 py-6 md:px-6 md:py-8 m-6">
          <Avatar className="h-20 w-20 md:h-28 md:w-28">
            <AvatarImage alt={localUser.userName} src={profileImage} />
            <AvatarFallback>{localUser.userName[0]}</AvatarFallback>
          </Avatar>

          <div className="grid gap-1 flex-1">
            <h1 className="text-xl font-bold md:text-2xl">
              {localUser.name + " " + localUser.lastName}
            </h1>
            <p className="text-sm">@{localUser.userName}</p>

            <div className="flex items-center gap-2">
              <span className="icon-[mdi--star]"></span>
              {localUser.points}
            </div>
          </div>
          <DinamicDialogForm
            fields={[
              {
                name: "profileImage",
                label: "Profile Image",
                type: "file",
              },
              {
                name: "name",
                label: "Name",
                type: "text",
                validation: { required: true },
                defaultValue: localUser.name,
              },
              {
                name: "lastName",
                label: "Last Name",
                type: "text",
                validation: { required: true },
                defaultValue: localUser.lastName,
              },
            ]}
            label="Edit Profile"
            onSubmitHandler={(data) => onSubmit("", data)}
          />
        </Card>

        <div className="grid gap-8 px-4 md:px-6 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-8">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>About</CardTitle>
                <DinamicDialogForm
                  fields={[
                    {
                      name: "about",
                      label: "About",
                      type: "textarea",
                      validation: { required: true },
                      defaultValue: localUser.about,
                    },
                  ]}
                  label="Edit About"
                  onSubmitHandler={(data) => onSubmit("", data)}
                />
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="w-full break-words">
                  <p>{localUser.about}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Skills</CardTitle>
                <DinamicDialogForm
                  fields={[
                    {
                      name: "skill",
                      label: "Skill",
                      type: "text",
                      validation: { required: true },
                    },
                  ]}
                  label="Add Skill"
                  onSubmitHandler={(data) => onSubmit("skills", data)}
                />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {localUser.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-md cursor-pointer"
                      onClick={() => handleDeleteSkill(index)}
                    >
                      {skill.skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>links</CardTitle>
                <DinamicDialogForm
                  fields={[
                    {
                      name: "plataform",
                      label: "Title",
                      type: "text",
                      validation: { required: true },
                    },
                    {
                      name: "url",
                      label: "url",
                      type: "text",
                      validation: { required: true },
                    },
                  ]}
                  label="Add Link"
                  onSubmitHandler={(data) => onSubmit("socialLinks", data)}
                />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {localUser.socialLinks.map((link, index) => (
                    <Badge key={index} variant="secondary" className="text-md">
                      <Link to={link.url} target="_blank">
                        {link.plataform}
                      </Link>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader className="flex flex-row justify-between  items-center">
                <CardTitle>Experience</CardTitle>
                <DinamicDialogForm
                  fields={[
                    {
                      name: "company",
                      label: "Company",
                      type: "text",
                      validation: { required: true },
                    },
                    {
                      name: "position",
                      label: "position",
                      type: "text",
                      validation: { required: true },
                    },
                    {
                      name: "startDate",
                      label: "Start Date",
                      type: "date",
                      validation: { required: true },
                    },
                    {
                      name: "endDate",
                      label: "End Date",
                      type: "date",
                    },
                    {
                      name: "description",
                      label: "Description",
                      type: "textarea",
                      validation: { required: true },
                    },
                  ]}
                  label="Add Experience"
                  onSubmitHandler={(data) => onSubmit("experience", data)}
                />
              </CardHeader>
              <CardContent className="space-y-12">
                {localUser.experience.map((exp, index) => (
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

            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Education</CardTitle>
                <DinamicDialogForm
                  fields={[
                    {
                      name: "institution",
                      label: "Institution",
                      type: "text",
                      validation: { required: true },
                    },
                    {
                      name: "degree",
                      label: "Degree",
                      type: "text",
                      validation: { required: true },
                    },
                    {
                      name: "startDate",
                      label: "Start Date",
                      type: "date",
                      validation: { required: true },
                    },
                    {
                      name: "endDate",
                      label: "End Date",
                      type: "date",
                    },
                  ]}
                  label="Add Education"
                  onSubmitHandler={(data) => onSubmit("education", data)}
                />
              </CardHeader>
              <CardContent className="space-y-12">
                {localUser.education.map((edu, index) => (
                  <div key={index} className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{edu.degree}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(edu.startDate)} -{" "}
                        {edu.endDate ? formatDate(edu.endDate) : "Present"}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        {isEditing && (
          <div className="flex justify-center gap-4 p-6">
            <Button
              variant="outline"
              onClick={() => {
                setLocalUser({ ...user });
                setIsEditing(false);
              }}
            >
              Discard Changes
            </Button>
            <Button variant="secondary" onClick={handleUpdateProfile}>
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Save, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// Form schema for profile update
const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username cannot be more than 20 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional()
    .or(z.literal("")),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .optional()
    .or(z.literal("")),
  confirmPassword: z.string().optional().or(z.literal("")),
}).refine(data => !data.newPassword || data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine(data => !data.newPassword || data.currentPassword, {
  message: "Current password is required to set a new password",
  path: ["currentPassword"],
});

// Form schema for preferences
const preferencesFormSchema = z.object({
  darkMode: z.boolean().default(false),
  emailNotifications: z.boolean().default(true),
  autoSave: z.boolean().default(true),
  showLineNumbers: z.boolean().default(true),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

export default function UserProfile() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: user?.username || "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Preferences form
  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      darkMode: false,
      emailNotifications: true,
      autoSave: true,
      showLineNumbers: true,
    },
  });

  // Profile update mutation
  const profileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      return apiRequest("/api/user/profile", "PUT", data);
    },
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      profileForm.reset({
        ...profileForm.getValues(),
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Preferences update mutation
  const preferencesMutation = useMutation({
    mutationFn: async (data: PreferencesFormValues) => {
      return apiRequest("/api/user/preferences", "PUT", data);
    },
    onSuccess: () => {
      toast({
        title: "Preferences updated",
        description: "Your preferences have been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    profileMutation.mutate(data);
  };

  const onPreferencesSubmit = (data: PreferencesFormValues) => {
    preferencesMutation.mutate(data);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="text-center py-10 border border-dashed rounded-lg border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to view your profile settings.
          </p>
          <Button onClick={() => window.scrollTo(0, 0)}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <UserIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal information and password
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <FormField
                    control={profileForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="your@email.com" />
                        </FormControl>
                        <FormDescription>
                          Your email for notifications. (Optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator className="my-6" />
                  
                  <div className="mb-2">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Update your password here. Leave blank to keep current password.
                    </p>
                  </div>
                  
                  <FormField
                    control={profileForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <CardFooter className="px-0 pt-6">
                    <Button 
                      type="submit" 
                      className="ml-auto"
                      disabled={profileMutation.isPending}
                    >
                      {profileMutation.isPending ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your experience with these preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...preferencesForm}>
                <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
                  <FormField
                    control={preferencesForm.control}
                    name="darkMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Dark Mode</FormLabel>
                          <FormDescription>
                            Enable dark mode for the application
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={preferencesForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <FormDescription>
                            Receive email notifications about your account
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={preferencesForm.control}
                    name="autoSave"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Auto-Save</FormLabel>
                          <FormDescription>
                            Automatically save your work while coding
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={preferencesForm.control}
                    name="showLineNumbers"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Show Line Numbers</FormLabel>
                          <FormDescription>
                            Display line numbers in the code editor
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <CardFooter className="px-0 pt-6">
                    <Button 
                      type="submit" 
                      className="ml-auto"
                      disabled={preferencesMutation.isPending}
                    >
                      {preferencesMutation.isPending ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Preferences
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
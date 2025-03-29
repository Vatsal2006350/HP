import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XPProvider } from "@/contexts/XPContext";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <XPProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="course/[courseId]" options={{ headerShown: false }} />
          <Stack.Screen name="course/[courseId]/lesson/[lessonId]" options={{ headerShown: false }} />
        </Stack>
      </TooltipProvider>
    </XPProvider>
  </QueryClientProvider>
);

export default App;

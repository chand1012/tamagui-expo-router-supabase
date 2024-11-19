import { useState } from "react";
import { Platform } from "react-native";
import { Form, Button, Input, Label, YStack, XStack, Spinner } from "tamagui";

import { supabase } from "@/lib/supabase";
import LoginForm from "@/components/LoginForm";

export default function Auth() {
  return <LoginForm />;
}


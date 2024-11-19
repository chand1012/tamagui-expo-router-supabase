import { useState } from "react";
import { Platform } from "react-native";
import { Form, Button, Input, Label, YStack, XStack, Spinner } from "tamagui";

import { supabase } from "@/lib/supabase";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitForm = async () => {
    setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert("Error logging in: " + error.message);
      }
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        alert("Error signing up: " + error.message);
      }
    }
  };

  return (
    <YStack f={1} ai="center" gap="$8" px="$10" pt="$5" bg="$background">
      <Form alignItems="center" gap="$4" onSubmit={onSubmitForm}>
        <YStack gap="$1">
          <YStack width="$20" gap="$1">
            <Label>Email</Label>
            <Input value={email} onChangeText={setEmail} />
          </YStack>
          <YStack width="$20" gap="$1">
            <Label>Password</Label>
            <Input
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </YStack>
          {mode === "signup" && (
            <YStack width="$20" gap="$1">
              <Label>Confirm Password</Label>
              <Input
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </YStack>
          )}
        </YStack>
        <XStack width="$20" gap="$2" flex={1}>
          <Form.Trigger asChild disabled={loading}>
            <Button flexGrow={1} icon={loading ? () => <Spinner /> : undefined}>
              {mode === "signin" ? "Sign In" : "Register"}
            </Button>
          </Form.Trigger>
          {/* This is the mode toggle */}
        </XStack>
        <XStack width="$20" gap="$2" flex={1}>
          <Button
            flexGrow={1}
            variant="outlined"
            onPress={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin"
              ? "Register New Account"
              : "Login to Existing Account"}
          </Button>
        </XStack>
      </Form>
    </YStack>
  );
}

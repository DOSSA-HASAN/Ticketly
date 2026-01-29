import "package:flutter/material.dart";
import "package:flutter_riverpod/flutter_riverpod.dart";
import "package:ticket_app/providers/auth_provider.dart";
import "package:ticket_app/screens/auth/login_screen.dart";
import "package:ticket_app/screens/navigation/root_navigation.dart";

class MainWrapper extends ConsumerWidget {
  const MainWrapper({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);

    // Conditional rendering
    if (authState.isAuthenticated) {
      return const RootNavigation();
    } else {
      return LoginScreen();
    }
  }
}

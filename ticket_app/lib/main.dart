import "package:flutter/material.dart";
import "package:flutter_riverpod/flutter_riverpod.dart";
import "package:ticket_app/core/theme/app_theme.dart";
import "package:ticket_app/screens/SplashScreen.dart";
import "package:ticket_app/screens/auth/login_screen.dart";

void main(){
  runApp(const ProviderScope(child: TicketApp()));
}

class TicketApp extends StatelessWidget {
  const TicketApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
       debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: SplashScreen(),
    );
  }
}
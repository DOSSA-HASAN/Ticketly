import "package:flutter/material.dart";
import "package:google_fonts/google_fonts.dart";

class AppTheme {
  // Define custome theme color
  static const Color primaryColor = Color(0xFF2196F3);

  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(seedColor: primaryColor),

    // Global input field styles
    inputDecorationTheme: InputDecorationTheme(
      filled: false,
      fillColor: Colors.grey[80],
      enabledBorder: UnderlineInputBorder(
        borderSide: BorderSide(color: Colors.grey, width: 1),
      ),
      focusedBorder: UnderlineInputBorder(
        borderSide: const BorderSide(color: Colors.blue, width: 1),
      ),
    ),

    // Global Elevated button styles
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
        minimumSize: const Size(double.infinity, 56),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)
      )
    ),

    textTheme: GoogleFonts.poppinsTextTheme().copyWith(
      displayLarge: GoogleFonts.pacifico(fontSize: 48, color: Colors.white),
      displayMedium: GoogleFonts.roboto(fontSize: 16, color: Colors.black),
      displaySmall: GoogleFonts.roboto(fontSize: 10, color: Colors.black12),
    ),
  );
}

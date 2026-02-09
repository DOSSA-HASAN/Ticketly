import "dart:ui";

import "package:flutter/material.dart";
import "package:ticket_app/screens/add_ticket_screen.dart";

Widget buildGlassAddButton(BuildContext context) {
  return Positioned(
    bottom: 100,
    right: 20,
    child: ClipRRect(
      borderRadius: BorderRadius.circular(100),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          width: 60,
          height: 60,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.2),
            borderRadius: BorderRadius.circular(100),
            border: Border.all(
              color: Colors.black.withOpacity(0.1),
              width: 1.5,
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              borderRadius: BorderRadius.circular(100),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const AddTicketScreen(),
                  ),
                );
              },
              child: const Icon(Icons.add, color: Colors.blueAccent, size: 30),
            ),
          ),
        ),
      ),
    ),
  );
}

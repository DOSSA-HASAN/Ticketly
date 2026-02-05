import 'dart:ui';

import 'package:flutter/material.dart';

Widget buildBackgroundDecoration() {
  return Stack(
    children: [
      Positioned(
        top: -50,
        right: -50,
        child: Container(
          width: 300,
          height: 300,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: const Color(0xFF448AFF).withOpacity(0.08),
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 70, sigmaY: 70),
            child: Container(color: Colors.transparent),
          ),
        ),
      ),
      Positioned(
        top: 300,
        left: -100,
        child: Container(
          width: 250,
          height: 250,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Color(0xFF9C27B0).withOpacity(0.1),
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 60, sigmaY: 60),
            child: Container(color: Colors.transparent),
          ),
        ),
      ),
    ],
  );
}

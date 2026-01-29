import "package:dio/dio.dart";
import "package:flutter_riverpod/flutter_riverpod.dart";

final dioProvider = Provider<Dio>((ref) {
  return Dio(
    BaseOptions(
      baseUrl: "https://ticketly-uda3.onrender.com/api/",
      connectTimeout: const Duration(seconds: 5),
      receiveTimeout: const Duration(seconds: 3),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    ),
  );
});

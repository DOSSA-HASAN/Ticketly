import "package:dio/dio.dart";
import "package:flutter_riverpod/flutter_riverpod.dart";

class AuthState {
  final bool isLoggingIn; // Used for loggin in
  final String? token;
  final String? error;
  final bool isSigningup;

  AuthState({
    this.isLoggingIn = false,
    this.token,
    this.error,
    this.isSigningup = false,
  });
}

class AuthNotifier extends Notifier<AuthState> {
  @override
  AuthState build() {
    return AuthState();
  }

  // Login function
  Future<void> login(String email, String password) async {
    final dio = Dio(BaseOptions(baseUrl: "http://localhost:5000/"));

    try {
      state = AuthState(isLoggingIn: true);
      final response = await dio.post(
        "api/auth/login",
        data: {"email": email, "password": password},
      );

      if (response.statusCode == 200) {
        final token = response.data['token'];
        state = AuthState(token: token);
      }
    } on DioException catch (e) {
      state = AuthState(
        error: e.response?.data['message'] ?? "Login failed",
        isLoggingIn: false,
      );
    }
  }

  Future<void> signup(String email, String password) async {
    final dio = Dio(BaseOptions(baseUrl: "http://localhost:5000/"));
    try {
      state = AuthState(isSigningup: true);
      final response = await dio.post(
        "api/auth/login",
        data: {"email": email, "password": password},
      );

      if (response.statusCode == 200) {
        // Show success message for signup we dont store anything
        state = AuthState(isSigningup: false);
      }
    } on DioException catch (e) {
      state = AuthState(
        error: e.response?.data['message'] ?? "Registration failed",
        isSigningup: false,
      );
    }
  }
}

final authProvider = NotifierProvider<AuthNotifier, AuthState>(() {
  return AuthNotifier();
});

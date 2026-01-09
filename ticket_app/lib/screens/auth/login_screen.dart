import "package:flutter/material.dart";
import "package:ticket_app/screens/auth/register_screen.dart";
import "../../providers/auth_provider.dart";
import "package:flutter_riverpod/flutter_riverpod.dart";

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  // To hold the text typed by users into the input fields
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  // variable to toggle between text and password type
  bool _obscurePassword = true;

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // watch auth provider for changes
    final authState = ref.watch(authProvider);

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Center(
                child: Column(
                  children: [
                    // Logo Text
                    Text(
                      "Ticketly",
                      style: Theme.of(
                        context,
                      ).textTheme.displayLarge?.copyWith(color: Colors.blue),
                    ),
                    SizedBox(height: 8),
                    Text(
                      "Welcome Back!",
                      style: Theme.of(
                        context,
                      ).textTheme.displayMedium,
                    ),
                    SizedBox(height: 8),
                    Text(
                      "Please login to continue",
                      style: Theme.of(
                        context,
                      ).textTheme.displayMedium,
                    ),
                    SizedBox(height: 40),

                    // Email input field
                    TextField(
                      controller: emailController,
                      decoration: const InputDecoration(
                        hintText: "Email Address",
                        prefixIcon: Icon(Icons.mail),
                      ),
                    ),
                    SizedBox(height: 10),
                    // Password input fields
                    TextField(
                      controller: passwordController,
                      obscureText: _obscurePassword,
                      decoration: InputDecoration(
                        hintText: "Password",
                        prefixIcon: Icon(Icons.lock),
                        suffixIcon: IconButton(
                          onPressed: () {
                            setState(() {
                              _obscurePassword = !_obscurePassword;
                            });
                          },
                          icon: Icon(
                            _obscurePassword
                                ? Icons.visibility_off
                                : Icons.visibility,
                          ),
                        ),
                      ),
                    ),

                    // Login button
                    SizedBox(height: 32),
                    ElevatedButton(
                      onPressed: authState.isLoggingIn
                          ? null
                          : () {
                              ref
                                  .read(authProvider.notifier)
                                  .login(
                                    emailController.text,
                                    passwordController.text,
                                  );
                            },
                      child: authState.isLoggingIn
                          ? const SizedBox(
                              height: 20,
                              width: 20,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                color: Colors.white,
                              ),
                            )
                          : const Text("Login"),
                    ),
                    SizedBox(height: 20),
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const RegisterScreen(),
                          ),
                        );
                      },
                      child: Text(
                        "Don't have an account?\nClick here to create one now.",
                        textAlign: TextAlign.center,
                        style: Theme.of(context).textTheme.displayMedium
                            ?.copyWith(color: Colors.grey, fontSize: 15),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

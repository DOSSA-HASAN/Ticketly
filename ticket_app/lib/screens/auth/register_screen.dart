import "package:flutter/material.dart";
import 'package:flutter_riverpod/flutter_riverpod.dart';
import "package:ticket_app/screens/auth/login_screen.dart";
import "../../providers/auth_provider.dart";

class RegisterScreen extends ConsumerStatefulWidget {
  const RegisterScreen({super.key});

  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  // Input field controllers
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  // Show and hide password
  bool _obscurePassword = true;

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
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
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      "Ticketly",
                      style: Theme
                          .of(
                        context,
                      )
                          .textTheme
                          .displayLarge
                          ?.copyWith(color: Colors.blue),
                    ),
                    SizedBox(height: 8),
                    Text(
                      "Hey there,",
                      style: Theme
                          .of(context)
                          .textTheme
                          .displayMedium,
                    ),
                    Text(
                      "Create an account to continue,",
                      style: Theme
                          .of(context)
                          .textTheme
                          .displayMedium,
                    ),
                    SizedBox(height: 40),

                    // Input fields
                    TextField(
                      controller: emailController,
                      decoration: InputDecoration(
                        prefixIcon: Icon(Icons.email),
                        hintText: "Email Address",
                      ),
                    ),
                    SizedBox(height: 10),
                    TextField(
                      obscureText: _obscurePassword,
                      controller: passwordController,
                      decoration: InputDecoration(
                        prefixIcon: Icon(Icons.lock),
                        hintText: "Password",
                        suffixIcon: IconButton(
                          onPressed: () {
                            setState(() {
                              _obscurePassword = !_obscurePassword;
                            });
                          },
                          icon: Icon(
                            _obscurePassword
                                ? Icons.visibility
                                : Icons.visibility_off,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(height: 32),
                    ElevatedButton(
                      onPressed: authState.isSigningup
                          ? null
                          : () {
                        ref
                            .read(authProvider.notifier)
                        // Change to signup later
                            .signup(
                          emailController.text,
                          passwordController.text,
                        );
                      },
                      child: authState.isSigningup
                          ? SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                          : const Text("Signup"),
                    ),
                    SizedBox(height: 20),
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => LoginScreen(),
                          ),
                        );
                      },
                      child: Text(
                        "Already have an account?\nClick here to login.",
                        textAlign: TextAlign.center,
                        style: Theme
                            .of(context)
                            .textTheme
                            .displayMedium
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

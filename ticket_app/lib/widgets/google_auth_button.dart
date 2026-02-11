import "package:flutter/material.dart";
import "package:flutter_riverpod/flutter_riverpod.dart";
import "package:ticket_app/core/theme/app_theme.dart";
import "package:ticket_app/providers/auth_provider.dart";

class GoogleAuthButton extends ConsumerStatefulWidget {
  final String label;
  final VoidCallback onPressed;

  const GoogleAuthButton({
    super.key,
    required this.label,
    required this.onPressed,
  });

  @override
  ConsumerState<GoogleAuthButton> createState() => _GoogleAuthButtonState();
}

class _GoogleAuthButtonState extends ConsumerState<GoogleAuthButton> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final _isGoogleLoading = ref.watch(
      authProvider.select((s) => s.googleAuth),
    );
    return AnimatedScale(
      scale: _isPressed ? 0.96 : 1.0,
      duration: const Duration(milliseconds: 500),
      child: Material(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        elevation: 2,
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTapUp: (_) => setState(() => _isPressed = true),
          onTapDown: (_) => setState(() => _isPressed = false),
          onTapCancel: () => setState(() => _isPressed = false),
          onTap: _isGoogleLoading ? null : widget.onPressed,
          child: Ink(
            height: 56,
            width: double.infinity,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.grey),
            ),
            child: _isGoogleLoading
                ? Center(
                    child: const SizedBox(
                      height: 24,
                      width: 24,
                      child: CircularProgressIndicator(),
                    ),
                  )
                : Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Image.asset("images/google-logo.png", height: 24),
                      const SizedBox(width: 12),
                      Text(
                        widget.label,
                        style: Theme.of(context).textTheme.displayMedium
                            ?.copyWith(fontWeight: FontWeight.w600),
                      ),
                    ],
                  ),
          ),
        ),
      ),
    );
  }
}

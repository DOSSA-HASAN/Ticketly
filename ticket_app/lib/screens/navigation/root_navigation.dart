import "package:flutter/material.dart";
import "package:ticket_app/screens/home_screen.dart";
import "package:ticket_app/screens/profile_screen.dart";
import "dart:ui";

class RootNavigation extends StatefulWidget {
  const RootNavigation({super.key});

  @override
  State<RootNavigation> createState() => _RootNavigationState();
}

class _RootNavigationState extends State<RootNavigation> {
  int _selectedIndex = 0;

  // Screens we will toggle between
  late List<Widget> _screens;

  @override
  void initState() {
    super.initState();
    _screens = [HomeScreen(), ProfileScreen()];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true, // Check what this does
      body: IndexedStack(index: _selectedIndex, children: _screens),
      bottomNavigationBar: _buildModernNavbar(),
    );
  }

  // Code for modern navbar
  Widget _buildModernNavbar() {
    return Container(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 25),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(25),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            height: 70,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.05),
              borderRadius: BorderRadius.circular(25),
              border: Border.all(
                color: Colors.white.withOpacity(0.2),
                width: 1.5,
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _navItem(Icons.home_outlined, Icons.home, "Home", 0),
                _navItem(Icons.person_outline, Icons.person, "Profile", 1),
              ],
            ),
          ),
        ),
      ), // Check what this does
    );
  }

  Widget _navItem(IconData icon, IconData activeIcon, String label, int index) {
    bool isActive = _selectedIndex == index;

    return GestureDetector(
      onTap: () => setState(() {
        _selectedIndex = index;
      }),
      behavior: HitTestBehavior.opaque, // Check this too,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            padding: EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: isActive
                  ? Colors.blue.withOpacity(0.15)
                  : Colors.transparent,
              shape: BoxShape.circle, // Check what this does
            ),
            child: Icon(
              isActive ? activeIcon : icon,
              color: isActive ? Colors.blue : Colors.grey.shade600,
              size: 26,
            ),
          ),
          AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            margin: EdgeInsets.only(top: 3),
            height: 4,
            width: isActive ? 4 : 0,
            decoration: BoxDecoration(
              color: Colors.blue,
              shape: BoxShape.circle,
            ),
          ),
        ],
      ),
    );
  }
}

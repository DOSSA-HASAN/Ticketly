import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ticket_app/providers/auth_provider.dart';
import 'package:ticket_app/providers/ticket_provider.dart';

class AddTicketScreen extends ConsumerStatefulWidget {
  const AddTicketScreen({super.key});

  @override
  ConsumerState<AddTicketScreen> createState() => _AddTicketScreenState();
}

class _AddTicketScreenState extends ConsumerState<AddTicketScreen> {
  final _formKey = GlobalKey<FormState>();
  String? currentUserId;

  @override
  void initState() {
    super.initState();
    final _auth = ref.read(authProvider).user;
    currentUserId = _auth?.id;
  }

  // Controllers
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _priceController = TextEditingController();
  final _locationController = TextEditingController();
  final _quantityController = TextEditingController();
  DateTime? _selectedDate;

  Future<void> _submitData() async {
    if (!_formKey.currentState!.validate() || _selectedDate == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Please fill all fields and select a data")),
      );
      return;
    }

    final success = await ref
        .read(ticketProvider.notifier)
        .addTicket(
          title: _titleController.text,
          description: _descriptionController.text,
          price: double.parse(_priceController.text),
          eventDate: _selectedDate!,
          location: _locationController.text,
          quantity: int.parse(_quantityController.text),
          sellerId: currentUserId!,
        );
    if (success && mounted) {
      Navigator.pop(context); // Return to home screen
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Create Ticket",
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              _buildField("Event title", _titleController, Icons.title),
              _buildField(
                "Description",
                _descriptionController,
                Icons.description,
                maxLines: 3,
              ),
              Row(
                children: [
                  Expanded(
                    child: _buildField(
                      "Price",
                      _priceController,
                      Icons.attach_money,
                      isNumber: true,
                    ),
                  ),
                  const SizedBox(width: 15),
                  Expanded(
                    child: _buildField(
                      "Quantity",
                      _quantityController,
                      Icons.numbers,
                      isNumber: true,
                    ),
                  ),
                ],
              ),
              _buildField("Location", _locationController, Icons.location_on),

              // Date selection UI
              GestureDetector(
                // onTap: _pickDate,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 16,
                  ),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.grey.shade300),
                  ),
                  child: Row(
                    children: [
                      const Icon(
                        Icons.calendar_today,
                        size: 20,
                        color: Colors.blueAccent,
                      ),
                      const SizedBox(width: 12),
                      Text(
                        _selectedDate == null
                            ? "Select Date Event"
                            : "${_selectedDate!.day}/${_selectedDate!.month}/${_selectedDate!.year}",
                        style: TextStyle(
                          color: _selectedDate == null
                              ? Colors.grey.shade300
                              : Colors.black,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

Widget _buildField(
  String label,
  TextEditingController controller,
  IconData icon, {
  bool isNumber = false,
  int maxLines = 1,
}) {
  return Padding(
    padding: EdgeInsets.only(bottom: 20),
    child: TextFormField(
      controller: controller,
      keyboardType: isNumber ? TextInputType.number : TextInputType.text,
      maxLines: maxLines,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon, size: 20, color: Colors.blueAccent,),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
      ),
      validator: (value) => value == null || value.isEmpty ? "Required" : null,
    ),
  );
}

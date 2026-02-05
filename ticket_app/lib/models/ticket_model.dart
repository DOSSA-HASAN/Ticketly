class TicketModel {
  final String id;
  final String title;
  final String description;
  final double price;
  final DateTime date;
  final String location;
  final bool isAvailable;
  final String category;
  final String imageUrl;

  const TicketModel({
    required this.id,
    required this.title,
    required this.description,
    required this.price,
    required this.date,
    required this.location,
    required this.isAvailable,
    required this.category,
    required this.imageUrl,
  });

  factory TicketModel.fromJson(Map<String, dynamic> json) {
    return TicketModel(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      price: (json['price'] as num)?.toDouble() ?? 0.0,
      date: json['date'] != null
          ? DateTime.parse(json['date'])
          : DateTime.now(),
      location: json['location'] ?? 'Online',
      isAvailable: json['isAvailable'] as bool,
      category: json['category'] ?? 'General',
      imageUrl:
          json['imageUrl'] ??
          'https://via.placeholder.com/300', // Change this to a placeholder image in app
    );
  }
}

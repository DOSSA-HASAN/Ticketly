import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ticket_app/dio_provider.dart';
import 'package:ticket_app/models/ticket_model.dart';

class TicketFilterNotifier extends Notifier<Map<String, dynamic>> {
  @override
  Map<String, dynamic> build() {
    return {'search': '', 'category': '', 'page': 1};
  }

  void updateSearch(String search) {
    state = {...state, 'search': search};
  }

  void nextPage() => state = {...state, 'page': state['page'] + 1};

  void updateCategory(String category) {
    state = {...state, 'category': category};
  }
}

final ticketProvider = AsyncNotifierProvider<TicketNotifier, List<TicketModel>>(
  () {
    return TicketNotifier();
  },
);

class TicketNotifier extends AsyncNotifier<List<TicketModel>> {
  @override
  Future<List<TicketModel>> build() {
    return _fetchTickets();
  }

  Future<List<TicketModel>> _fetchTickets() async {
    final dio = ref.read(dioProvider);
    final filters = ref.watch(ticketFilterProvider);

    final response = await dio.post(
      'ticket/all',
      data: {
        'search': filters['search'],
        'category': filters['category'],
        'page': filters['page'],
        'limit': 10,
      },
    );

    final List data = response.data['tickets'];
    return data.map((json) => TicketModel.fromJson(json)).toList();
  }

  Future<void> fetchNextPage() async {
    if(state.isLoading) return;

    ref.read(ticketFilterProvider.notifier).nextPage();

    final newTickets = await _fetchTickets();

    final previousTickets = state.value ?? [];
    state = AsyncData([...previousTickets, ...newTickets]);
  }
}

// Last in file
final ticketFilterProvider =
    NotifierProvider<TicketFilterNotifier, Map<String, dynamic>>(
      TicketFilterNotifier.new,
    );

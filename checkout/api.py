
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.generics import RetrieveAPIView
from services.models import Services
from services.serializers import ServicesSerializer

import stripe
from stripe import PaymentIntent
import os
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")


# class QuoteAPI(APIView):
#     def post(self, request):
#         intent = PaymentIntent.create(
#             amount=100,
#             currency='eur',
#             metadata={'integration_check': 'accept_a_payment'})


class QuoteRequestView(RetrieveAPIView):
    # get the service type user wants
    queryset = Services.objects.all()

    @csrf_exempt
    def post(self, request):

        queryset = Services.objects.get(name=request.data.get('project_type'))

        services = ServicesSerializer(queryset)

        return Response(services.data)
